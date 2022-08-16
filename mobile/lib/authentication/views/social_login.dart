import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:rangex/authentication/bloc/login_event.dart';
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

  @override
  Widget build(BuildContext context) {
    return WebView(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      initialUrl: getLoginUrl(),
      onWebViewCreated: (controller) {
        _ctrler = controller;
      },
      javascriptMode: JavascriptMode.unrestricted,
      // javascriptChannels: {
      //   JavascriptChannel(
      //     name: 'SignupCompleted',
      //     onMessageReceived: _onSignupSubmitted,
      //   ),
      // },
    );
  }

  // get social login url
  getLoginUrl() {
    if (widget._loginType == 'kakao') {
      // ignore: constant_identifier_names
      const HOST_GET_ADDR = 'https://kauth.kakao.com/oauth/authorize';
      // ignore: non_constant_identifier_names
      final REST_API_KEY = dotenv.env['KAKAO_AUTH_REST_API_KEY'];
      // ignore: non_constant_identifier_names
      final REDIRECT_URI = dotenv.env['KAKAO_AUTH_REDIRECT_URI'];

      return '$HOST_GET_ADDR?client_id=$REST_API_KEY&redirect_uri=$REDIRECT_URI&response_type=code';
    }
  }
}
