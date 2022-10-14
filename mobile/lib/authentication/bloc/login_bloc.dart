import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:kakao_flutter_sdk/kakao_flutter_sdk_talk.dart';
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
      // 직접로그인
      if (event.type == LoginType.direct) {
        await _authRepository.directAuthenticate(
          userAccount: event.userAccount,
          userPW: event.userPW,
        );

        emit(LoginStateSuccess());
      }

      // 카카오톡 로그인
      if (event.type == LoginType.kakao) {
        await _authRepository.kakaoAuthenticate(event.authCode);

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
    // 로그인방식
    String loginWith;
    Function loginMethod;

    // 토큰들
    OAuthToken token;

    if (await isKakaoTalkInstalled()) {
      loginWith = '카카오톡으로 로그인';
      loginMethod = UserApi.instance.loginWithKakaoTalk;
    } else {
      loginWith = '카카오계정으로 로그인';
      loginMethod = UserApi.instance.loginWithKakaoAccount;
    }

    try {
      token = await loginMethod();
      print('$loginWith 토큰받기 성공 $token');

      // 전달받은 토큰으로 로그인 시도
      add(LoginRequested(LoginType.kakao, null, null, token.toJson()));
    } catch (error) {
      print('$loginWith 토큰받기 실패 $error');
    }
  }
}
