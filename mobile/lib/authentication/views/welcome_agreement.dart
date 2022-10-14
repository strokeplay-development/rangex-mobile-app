import 'package:auto_route/auto_route.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:rangex/routes/app_router.gr.dart';

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
                  recognizer: TapGestureRecognizer()
                    ..onTapDown = (details) {
                      context.router.push(
                        ThirdPartyRouter(
                            url: dotenv.env['THIRD_PRIVACY_POLICY']!),
                      );
                    },
                ),
                const TextSpan(text: '과 '),
                TextSpan(
                  text: tr('privacy_policy'),
                  recognizer: TapGestureRecognizer()
                    ..onTapDown = (details) {
                      context.router.push(
                        ThirdPartyRouter(
                            url: dotenv.env['THIRD_TERMS_OF_SETVICE']!),
                      );
                    },
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
            ),
    );
  }
}
