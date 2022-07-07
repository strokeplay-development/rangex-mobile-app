import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/authentication/bloc/login_bloc.dart';
import 'package:rangex/authentication/bloc/login_event.dart';
import 'package:rangex/authentication/bloc/login_state.dart';

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

  /// 로그인 버튼 클릭 핸들러
  void _loginSubmiited() {
    print('클릭됨');
    _loginBloc.add(LoginRequested(
      _userAccountCtrler.text,
      _userPWCtrler.text,
    ));
  }

  void _onWidgetDidBuild(Function callback) {
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      callback();
    });
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      bloc: _loginBloc,
      builder: (context, state) {
        /// 위젯 빌드 후 실행
        _onWidgetDidBuild(() {
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
              TextFormField(
                controller: _userAccountCtrler,
                decoration: const InputDecoration(
                  label: Text('Account'),
                ),
              ),
              const SizedBox(height: 8),
              TextFormField(
                obscureText: true,
                controller: _userPWCtrler,
                decoration: const InputDecoration(
                  label: Text('Password'),
                ),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(48),
                ),
                onPressed: _loginSubmiited,
                child: const Text('SIGN IN'),
              )
            ],
          ),
        );
      },
    );
  }
}
