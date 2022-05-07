import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/authentication/bloc/auth_event.dart';
import 'package:mobile/authentication/bloc/auth_state.dart';
import 'package:mobile/authentication/repositories/auth_repository.dart';
import 'package:mobile/authentication/repositories/user_repository.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc({
    required AuthRepository authRepository,
    required UserRepository userRepository,
  })  : _authRepository = authRepository,
        _userRepository = userRepository,
        super(const AuthState.unknown()) {
    /// @{Contructor Body Start}

    /// 인증상태 변경 이벤트 핸들러 등록
    on(_onAuthStatusChanged);

    /// 로그아웃 요청 이벤트 핸들러 등록
    on(_onAuthLogoutRequested);

    /// * 인증상태 변경 스트림 구독
    /// 인증상태가 변경되면 인증상태 변경 이벤트 발생시킴
    _authStatusSubscription = _authRepository.status
        .listen((status) => add(AuthStatusChanged(status)));

    /// @{End}
  }

  final AuthRepository _authRepository;
  final UserRepository _userRepository;

  late StreamSubscription<AuthStatus> _authStatusSubscription;

  /// * 인증상태 변경 이벤트 핸들러
  /// 상태변경 이벤트 발생 시 알맞은 state를 뱉음.
  Future<void> _onAuthStatusChanged(
    AuthStatusChanged event,
    Emitter<AuthState> emit,
  ) async {
    print('status changed -> ${event.status}');
    switch (event.status) {
      case AuthStatus.unknown:
        return emit(const AuthState.unknown());
      case AuthStatus.unauthenticated:
        return emit(const AuthState.unauthenticated());

      /// 사용자 정보가 있을 때만 authenticated 상태를 뱉음.
      case AuthStatus.authenticated:
        final user = await _userRepository.getUser();

        print(user);

        return emit(
          user != null
              ? AuthState.authenticated(user)
              : const AuthState.unauthenticated(),
        );
    }
  }

  /// *로그아웃 요청 이벤트 핸들러
  /// 로그아웃 이벤트 발생 시 로그아웃 처리함.
  void _onAuthLogoutRequested(
      AuthLogoutRequested event, Emitter<AuthState> emit) {
    _authRepository.logOut();
  }

  @override
  Future<void> close() {
    /// 상태변경 구독 취소
    _authStatusSubscription.cancel();

    /// 상태변경 스트림 종료
    _authRepository.dispose();

    return super.close();
  }
}
