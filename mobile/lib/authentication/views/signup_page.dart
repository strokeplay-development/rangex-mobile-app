import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:rangex/authentication/bloc/signup_bloc.dart';
import 'package:rangex/authentication/bloc/signup_event.dart';
import 'package:rangex/authentication/repositories/user_repository.dart';
import 'package:rangex/utils/lifecycle.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:auto_route/auto_route.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({Key? key}) : super(key: key);

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  late SignupBloc _bloc;
  late WebViewController _ctrler;

  @override
  void initState() {
    final repo = RepositoryProvider.of<UserRepository>(context);
    _bloc = SignupBloc(userRepository: repo);

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder(
      bloc: _bloc,
      builder: ((context, state) {
        LifeCycle.onWidgetDidBuild(() {
          if (state is SignupStateSuccess) {
            context.router.popUntil((route) => false);
            context.router.pushNamed('/welcome');

            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('가입완료'),
                backgroundColor: Colors.green,
              ),
            );
          }

          if (state is SignupStateFailure) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('가입실패'),
                backgroundColor: Colors.red,
              ),
            );
          }
        });

        return Scaffold(
          body: Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
            child: Stack(
              children: [
                WebView(
                  backgroundColor: Theme.of(context).scaffoldBackgroundColor,
                  initialUrl: '${dotenv.env['WEBVIEW_BASE_URL']}/signup/phone',
                  onWebViewCreated: (controller) {
                    _ctrler = controller;
                  },
                  javascriptMode: JavascriptMode.unrestricted,
                  javascriptChannels: {
                    JavascriptChannel(
                      name: 'AuthCodeRequested',
                      onMessageReceived: _onAuthCodeRequested,
                    ),
                    JavascriptChannel(
                      name: 'SignupCompleted',
                      onMessageReceived: _onSignupSubmitted,
                    ),
                    JavascriptChannel(
                      name: 'ErrorCatched',
                      onMessageReceived: (message) => print(message.message),
                    )
                  },
                ),
                Positioned(
                  top: 4,
                  left: 6,
                  child: IconButton(
                    icon: const Icon(
                      Icons.arrow_back,
                      color: Colors.white,
                    ),
                    onPressed: () async {
                      if (await _ctrler.canGoBack()) {
                        _ctrler.goBack();
                      } else {
                        context.router.pop();
                      }
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      }),
    );
  }

  /// 휴대폰 인증번호를 요청 받았을 때
  void _onAuthCodeRequested(JavascriptMessage webMessage) {
    _bloc.add(AuthCodeRequested(webMessage.message));
  }

  /// 회원가입 완료 요청을 받았을 때
  void _onSignupSubmitted(JavascriptMessage webMessage) {
    final userInfo = jsonDecode(webMessage.message);

    _bloc.add(SignupRequested(userInfo));
  }
}
