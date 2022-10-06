import 'package:auto_route/auto_route.dart';
import 'package:easy_localization/easy_localization.dart';
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
    final screenHeight = MediaQuery.of(context).size.height;

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
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                /// 로고
                SizedBox(
                  height: screenHeight * 0.3,
                  child: Center(
                    child: SvgPicture.asset(
                      'assets/images/logo_origin.svg',
                      height: 80,
                    ),
                  ),
                ),

                /// 로그인
                SizedBox(
                  height: screenHeight * 0.6,
                  child: Column(
                    children: [
                      /// 로그인 폼
                      LoginForm(loginBloc: _loginBloc),

                      /// 가입, 비밀번호 찾기
                      Row(
                        children: [
                          Expanded(
                            child: Container(
                              alignment: Alignment.centerLeft,
                              child: TextButton(
                                child: Text(tr('sign_up')),
                                onPressed: () =>
                                    AutoRouter.of(context).pushNamed('/signup'),
                              ),
                            ),
                          ),
                          Expanded(
                            child: Container(
                              alignment: Alignment.centerRight,
                              child: TextButton(
                                child: Text(tr('find_password')),
                                onPressed: () {},
                              ),
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),

                /// 이용약관 안내
                SizedBox(
                  height: screenHeight * 0.1,
                  child: const WelcomeAgreement(),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// 이용약관 안내문
class WelcomeAgreement extends StatefulWidget {
  const WelcomeAgreement({Key? key}) : super(key: key);

  @override
  State<WelcomeAgreement> createState() => _WelcomeAgreementState();
}

class _WelcomeAgreementState extends State<WelcomeAgreement> {
  @override
  Widget build(BuildContext context) {
    final bool isLangKo = context.locale.languageCode == "ko";

    return RichText(
        textAlign: TextAlign.center,
        text: isLangKo

            /// 한국어 버전
            ? TextSpan(
                text: '계속하면 rangex의 ',
                style: TextStyle(color: Theme.of(context).disabledColor),
                children: <TextSpan>[
                  TextSpan(
                    text: tr('terms_of_service'),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).highlightColor,
                    ),
                  ),
                  const TextSpan(text: '과 '),
                  TextSpan(
                    text: tr('privacy_policy'),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).highlightColor,
                    ),
                  ),
                  const TextSpan(text: '을 읽고 동의한 것으로 간주합니다.'),
                ],
              )

            /// 그 외 언어
            : TextSpan(
                text: 'If continue, you’re considered to argree with rangex ',
                style: TextStyle(color: Theme.of(context).disabledColor),
                children: <TextSpan>[
                  TextSpan(
                    text: tr('terms_of_service'),
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
              ));
  }
}
