import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/authentication/bloc/signup_bloc.dart';
import 'package:rangex/authentication/models/user.dart';
import 'package:rangex/authentication/repositories/user_repository.dart';

class SignupForm extends StatefulWidget {
  const SignupForm({Key? key}) : super(key: key);

  @override
  State<SignupForm> createState() => _SignupFormState();
}

class _SignupFormState extends State<SignupForm> {
  final _account = TextEditingController();
  final _pw = TextEditingController();
  final _name = TextEditingController();

  late final SignupBloc _bloc;

  @override
  void initState() {
    final repo = RepositoryProvider.of<UserRepository>(context);
    _bloc = SignupBloc(userRepository: repo);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<SignupBloc, SignupState>(
      bloc: _bloc,
      builder: (context, state) {
        /// 위젯 빌드 후 실행
        _onWidgetDidBuild(() {
          if (state is SignupStateSuccess) {
            context.router.replaceNamed('/login');

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

        return Form(
          child: Column(
            children: [
              TextFormField(
                controller: _account,
                decoration: const InputDecoration(
                  label: Text('Account'),
                ),
              ),
              TextFormField(
                obscureText: true,
                controller: _pw,
                decoration: const InputDecoration(
                  label: Text('Password'),
                ),
              ),
              TextFormField(
                controller: _name,
                decoration: const InputDecoration(
                  label: Text('Name'),
                ),
              ),
              ElevatedButton(
                onPressed: _onSignupSubmitted,
                child: const Text('가입'),
              )
            ],
          ),
        );
      },
    );
  }

  void _onSignupSubmitted() {
    final userInfo = User(
      userAccount: _account.text,
      name: _name.text,
      userPW: _pw.text,
    );

    _bloc.add(SignupRequested(userInfo));
  }

  void _onWidgetDidBuild(Function callback) {
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      callback();
    });
  }
}
