import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';
import 'package:rangex/authentication/bloc/login_bloc.dart';
import 'package:rangex/authentication/bloc/login_event.dart';
import 'package:rangex/authentication/bloc/login_state.dart';
import 'package:rangex/routes/app_router.gr.dart';
import 'package:rangex/utils/lifecycle.dart';
import 'package:easy_localization/easy_localization.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({
    Key? key,
    required this.loginBloc,
  }) : super(key: key);

  final LoginBloc loginBloc;

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  LoginBloc get _loginBloc => widget.loginBloc;

  final _formKey = GlobalKey<FormState>();
  final _userAccountCtrler = TextEditingController();
  final _userPWCtrler = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      bloc: _loginBloc,
      builder: (context, state) {
        /// 위젯 빌드 후 실행
        LifeCycle.onWidgetDidBuild(() {
          if (state is LoginStateSuccess) {
            context.router.popUntil((route) => false);
            context.router.pushNamed('/main');
          }

          if (state is LoginStateFailure) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('로그인 실패'),
                backgroundColor: Colors.red,
              ),
            );
          }
        });

        return Form(
          key: _formKey,
          child: Column(
            children: [
              /// 아이디 입력
              TextFormField(
                controller: _userAccountCtrler,
                decoration: InputDecoration(
                  label: Text(tr('account')),
                ),
              ),
              const SizedBox(height: 8),

              /// 비밀번호 입력
              TextFormField(
                obscureText: true,
                controller: _userPWCtrler,
                decoration: InputDecoration(
                  label: Text(tr('password')),
                ),
              ),
              const SizedBox(height: 16),

              /// 회원가입 버튼
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(48),
                ),
                onPressed: () => _loginSubmiited(LoginType.direct),
                child: Text(tr('sign_in')),
              ),
              const SizedBox(height: 16),

              /// 카카오 로그인
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(48),
                  backgroundColor: const Color(0xffFEE500),
                ),
                onPressed: () => _socialLoginRequest(LoginType.kakao),
                child: Text(tr('login_kakao'),
                    style: const TextStyle(color: Color(0xff392020))),
              ),
            ],
          ),
        );
      },
    );
  }

  /// 로그인 버튼 클릭 핸들러
  void _loginSubmiited(LoginType type) {
    _loginBloc.add(LoginRequested(
      type,
      _userAccountCtrler.text,
      _userPWCtrler.text,
    ));
  }

  void _socialLoginRequest(LoginType type) async {
    _loginBloc.add(SocialLoginRequested(type));
  }
}
