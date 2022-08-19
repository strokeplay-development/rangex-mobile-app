import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:rangex/api/api.dart';
import 'package:rangex/utils/auth.dart';

class KakaoAuthHttp extends HttpBase {
  KakaoAuthHttp()
      : super(
          rootPath: '/oauth',
          baseUrl: 'https://kauth.kakao.com',
        );

  final REST_API_KEY = dotenv.env['KAKAO_AUTH_REST_API_KEY'];
  final REDIRECT_URI = dotenv.env['KAKAO_AUTH_REDIRECT_URI'];
  // ID 토큰 유효성 검증 임의문자열
  final NONCE = AuthUtils.getRandomString(10);

  /// 카카오 로그인 화면 GET URL
  String get kakaoAuthRequestUrl {
    // ignore: non_constant_identifier_names
    final HOST_GET_ADDR = '$baseUrl$rootPath/authorize';

    return '$HOST_GET_ADDR?client_id=$REST_API_KEY&redirect_uri=$REDIRECT_URI&nonce=$NONCE&response_type=code';
  }

  /// 카카오 토큰 가져오기
  Future<Response> requestToken(String code) async {
    return await httpPost(
      '/token',
      {
        'grant_type': 'authorization_code',
        'client_id': REST_API_KEY,
        'redirect_uri': REDIRECT_URI,
        'code': code,
      },
      Options(
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
      ),
    );
  }
}
