import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Interceptors
class HttpInterceptor extends Interceptor {
  final secure = const FlutterSecureStorage();

  /// Http 요청에 `accessToken`과 `refreshToken`을 항상 실어보낸다.
  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final accessToken = await secure.read(key: 'accessToken');
    final refreshToken = await secure.read(key: 'refreshToken');

    options.headers['access-token'] = accessToken;
    options.headers['refresh-token'] = refreshToken;

    print('REQUEST[${options.method}] => PATH: ${options.path}');

    super.onRequest(options, handler);
  }

  /// Http 응답에서 새로운 `accessToken`이 발급되면 저장한다
  @override
  Future<void> onResponse(
    Response response,
    ResponseInterceptorHandler handler,
  ) async {
    String? accessToken = response.headers.value('access-token');

    if (accessToken != null) {
      await secure.write(key: 'access-token', value: accessToken);
    }

    print(
        'RESPONSE[${response.statusCode}] => PATH: ${response.requestOptions.path}');
    super.onResponse(response, handler);
  }

  @override
  void onError(DioError err, ErrorInterceptorHandler handler) {
    print(err);
    print(
        'ERROR[${err.response?.statusCode}] => PATH: ${err.requestOptions.path}');
    super.onError(err, handler);
  }
}

/// *Base
/// Api Http 클래스를 위한 추상클래스
abstract class HttpBase {
  HttpBase({required this.rootPath});

  final options = BaseOptions(baseUrl: dotenv.env['API_BASE_URL']!);
  final dio = Dio();

  String rootPath = '';

  Dio get _ {
    dio.options = options;
    dio.interceptors.add(HttpInterceptor());
    return dio;
  }

  String _path(String requestPath) {
    return rootPath + requestPath;
  }

  /// GET
  Future<Response> httpGet(String requestPath,
      [Map<String, dynamic>? query, Options? options]) {
    return _.get(_path(requestPath), queryParameters: query, options: options);
  }

  /// POST
  Future<Response> httpPost(String requestPath,
      [dynamic body, Options? options]) {
    return _.post(_path(requestPath), data: body, options: options);
  }

  /// PUT
  Future<Response> httpPut(String requestPath,
      [dynamic body, Options? options]) {
    return _.put(_path(requestPath), data: body, options: options);
  }

  /// DELETE
  Future<Response> httpDelete(String requestPath,
      [dynamic body, Options? options]) {
    return _.delete(_path(requestPath), data: body, options: options);
  }
}

/// *Authenticate
class AuthHttp extends HttpBase {
  AuthHttp() : super(rootPath: '/users');

  Future<Response> signup(dynamic body) async {
    return await httpPost('/signup', body);
  }

  Future<Response> login(dynamic body) async {
    return await httpPost('/signin', body);
  }

  Future<Response> fetchMe() async {
    return await httpGet('/me');
  }

  Future<Response> join(int userID, int joinNumber) async {
    return await httpPost('/join', {
      'userID': userID,
      'joinNumber': joinNumber,
    });
  }
}
