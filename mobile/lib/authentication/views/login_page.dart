import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/authentication/bloc/login_bloc.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/authentication/widgets/login_form.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
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
    return Scaffold(
      appBar: AppBar(title: const Text('로그인')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: LoginForm(
            loginBloc: _loginBloc,
          ),
        ),
      ),
    );
  }
}
