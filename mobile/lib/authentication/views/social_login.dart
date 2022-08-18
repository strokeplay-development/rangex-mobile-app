import 'dart:convert';

import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:rangex/api/kakao_auth.dart';
import 'package:rangex/authentication/bloc/login_bloc.dart';
import 'package:rangex/authentication/bloc/login_event.dart';
import 'package:rangex/authentication/bloc/login_state.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/utils/auth.dart';
import 'package:rangex/utils/lifecycle.dart';
import 'package:webview_flutter/webview_flutter.dart';

class SocialLoginPage extends StatefulWidget {
  const SocialLoginPage(
      {Key? key, @PathParam('loginType') required String loginType})
      : _loginType = loginType,
        super(key: key);

  final String _loginType;

  @override
  State<SocialLoginPage> createState() => _SocialLoginPageState();
}

class _SocialLoginPageState extends State<SocialLoginPage> {
  late WebViewController _ctrler;
  late final AuthRepository _authRepository;
  late final LoginBloc _loginBloc;

  @override
  void initState() {
    _authRepository = RepositoryProvider.of<AuthRepository>(context);
    _loginBloc = LoginBloc(authRepository: _authRepository);

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      bloc: _loginBloc,
      builder: (context, state) {
        LifeCycle.onWidgetDidBuild(() {
          if (state is LoginStateSuccess) {
            context.router.popUntil((route) => false);
            context.router.pushNamed('/main');
          }
        });

        return WebView(
          backgroundColor: Theme.of(context).scaffoldBackgroundColor,
          initialUrl: KakaoAuthHttp().kakaoAuthRequestUrl,
          onWebViewCreated: (controller) {
            _ctrler = controller;
          },
          javascriptMode: JavascriptMode.unrestricted,
          javascriptChannels: {
            JavascriptChannel(
              name: 'SocialLogin',
              onMessageReceived: _onReceiveKakaoAuthCode,
            ),
          },
        );
      },
    );
  }

  void _onReceiveKakaoAuthCode(JavascriptMessage message) {
    print(message.message);

    _loginBloc.add(LoginRequested(
      LoginType.kakao,
      null,
      null,
      message.message,
    ));
  }
}
