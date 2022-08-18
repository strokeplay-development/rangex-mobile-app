import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/authentication/bloc/login_event.dart';
import 'package:rangex/authentication/bloc/login_state.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc({required AuthRepository authRepository})
      : _authRepository = authRepository,
        super(LoginStateNone()) {
    on(_onLoginRequested);
    on(_onSocialLoginRequested);
  }

  final AuthRepository _authRepository;

  /// 로그인요청 이벤트가 도착하면
  /// `AuthRepository`에서 로그인 처리진행 후
  /// 성공 / 실패 상태를 내보냄.
  Future<void> _onLoginRequested(
    LoginRequested event,
    Emitter<LoginState> emit,
  ) async {
    try {
      if (event.type == LoginType.direct) {
        await _authRepository.logIn(
          userAccount: event.userAccount,
          userPW: event.userPW,
        );

        emit(LoginStateSuccess());
      }

      if (event.type == LoginType.kakao) {
        await _authRepository.kakaoLogin(event.authCode);

        emit(LoginStateSuccess());
      }
    } catch (e) {
      emit(LoginStateFailure(e));
    }
  }

  /// 소셜로그인 요청 이벤트 발생 시
  /// 소셜로그인 상태를 내보냄
  Future<void> _onSocialLoginRequested(
    SocialLoginRequested event,
    Emitter<LoginState> emit,
  ) async {
    emit(LoginStateSocial(loginType: event.type));
  }
}
