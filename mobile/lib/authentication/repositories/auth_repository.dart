import 'dart:async';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:rangex/api/api.dart';

/// 인증상태
enum AuthStatus { unknown, authenticated, unauthenticated }

/// 인증 레포지토리
/// 1. 서버와 통신하여 데이터를 처리
/// 2. 알맞은 인증상태를 스트림
class AuthRepository {
  AuthRepository(
    FlutterSecureStorage secureStorage,
  ) : _tokenStorage = secureStorage;

  final FlutterSecureStorage _tokenStorage;
  String? _accessToken;
  String? _refreshToken;

  final _controller = StreamController<AuthStatus>();

  /// 인증상태 스트림 getter
  Stream<AuthStatus> get status async* {
    yield await _hasToken
        ? AuthStatus.authenticated
        : AuthStatus.unauthenticated;

    yield* _controller.stream;
  }

  /// 보유 토큰검사
  /// access or refresh
  Future<bool> get _hasToken async {
    final access = await _tokenStorage.read(key: 'accessToken');
    final refresh = await _tokenStorage.read(key: 'refreshToken');

    return access != null || refresh != null;
  }

  // 액세스 토큰
  Future<String?> get accessToken async {
    return _accessToken ??= await _tokenStorage.read(key: 'accessToken');
  }

  // 리프레쉬 토큰
  Future<String?> get refreshToken async {
    return _refreshToken ??= await _tokenStorage.read(key: 'refreshToken');
  }

  /// 로그인
  /// API 서버로부터 전달받은 토큰들을 저장한다.
  Future<void> logIn(String accessToken, String refreshToken) async {
    await _tokenStorage.write(key: 'accessToken', value: accessToken);
    await _tokenStorage.write(key: 'refreshToken', value: refreshToken);

    _controller.add(AuthStatus.authenticated);
  }

  /// 로그아웃
  /// 저장되어 있는 토큰들을 삭제한다.
  Future<void> logOut() async {
    await _tokenStorage.delete(key: 'accessToken');
    await _tokenStorage.delete(key: 'refreshToken');

    _controller.add(AuthStatus.unauthenticated);
  }

  /// 매장가입
  Future<void> joinShop({required int userID, required int joinCode}) async {
    print('매장가입 $userID $joinCode');

    try {
      final res = await AuthHttp().join(userID, joinCode);
    } catch (e) {
      print(e);
    }
  }

  /// 로그인
  Future<void> directAuthenticate({
    required String? userAccount,
    required String? userPW,
  }) async {
    try {
      final res = await AuthHttp().login({
        'userAccount': userAccount,
        'userPW': userPW,
      });

      String accessToken = res.data['accessToken'] as String;
      String refreshToken = res.data['refreshToken'] as String;

      await logIn(accessToken, refreshToken);
    } catch (e) {
      _controller.add(AuthStatus.unauthenticated);
      print("직접로그인 실패 $e");
      throw Exception(e);
    }
  }

  Future<void> kakaoAuthenticate(dynamic code) async {
    try {
      if (code == null) {
        throw Error();
      }

      print("전달할 토큰코드: $code");
      final result = await AuthHttp().kakaoLogin(code);

      print('카카오 서버인증 완료 $result');

      String accessToken = result.data['accessToken'] as String;
      String refreshToken = result.data['refreshToken'] as String;

      await logIn(accessToken, refreshToken);
    } catch (e) {
      print("카카오 로그인 실패: $e");
      _controller.add(AuthStatus.unauthenticated);
      throw Exception(e);
    }
  }

  /// 인증상태 스트림 종료
  void dispose() => _controller.close();
}
