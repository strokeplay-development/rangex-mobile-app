import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:rangex/authentication/bloc/login_bloc.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/authentication/widgets/login_form.dart';

class WelcomePage extends StatefulWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  State<WelcomePage> createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
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
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          fit: BoxFit.cover,
          image: AssetImage('assets/images/welcome_bg.png'),
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Padding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                flex: 0,
                child: Center(
                  child: SvgPicture.asset(
                    'assets/images/logo_origin.svg',
                    height: 80,
                  ),
                ),
              ),
              Expanded(
                child: Column(
                  children: [
                    LoginForm(loginBloc: _loginBloc),
                    Row(
                      children: [
                        Expanded(
                          child: Container(
                            alignment: Alignment.centerLeft,
                            child: TextButton(
                              child: const Text("Sign up"),
                              onPressed: () =>
                                  AutoRouter.of(context).pushNamed('/signup'),
                            ),
                          ),
                        ),
                        Expanded(
                          child: Container(
                            alignment: Alignment.centerRight,
                            child: TextButton(
                              child: const Text("Forgot password?"),
                              onPressed: () {},
                            ),
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
              RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  text: 'If continue, you’re considered to argree with rangex ',
                  style: TextStyle(color: Theme.of(context).disabledColor),
                  children: <TextSpan>[
                    TextSpan(
                      text: 'Terms of Service',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).highlightColor,
                      ),
                    ),
                    const TextSpan(text: ' and to read '),
                    TextSpan(
                      text: 'Privacy Policy.',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).highlightColor,
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
