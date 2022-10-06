import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';
import 'package:rangex/app/app.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/authentication/repositories/user_repository.dart';

const secureStorage = FlutterSecureStorage();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load(fileName: '.env');

  // 다국어 지원 초기화
  await EasyLocalization.ensureInitialized();

  // 카카오 로그인 SDK 초기화
  KakaoSdk.init(
    nativeAppKey: dotenv.env['KAKAO_NATIVE_APP_KEY'],
    javaScriptAppKey: dotenv.env['KAKAO_JAVASCRIPT_KEY'],
  );

  runApp(
    EasyLocalization(
      saveLocale: true,
      useOnlyLangCode: true,
      path: 'assets/translations',
      supportedLocales: const [Locale('en'), Locale('ko')],
      fallbackLocale: const Locale('en'),
      child: App(
        authRepository: AuthRepository(secureStorage),
        userRepository: UserRepository(),
      ),
    ),
  );
}
