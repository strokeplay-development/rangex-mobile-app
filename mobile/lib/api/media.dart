import 'package:dio/dio.dart';
import 'package:rangex/api/api.dart';

class MediaHttp extends HttpBase {
  MediaHttp() : super(rootPath: '/users');

  final Options _options = Options(contentType: 'multipart/form-data');

  Future<Response> modifyAvatar(dynamic body) async {
    return await httpPut('/me/avatar', body, _options);
  }

  Future<Response> downloadVideo(dynamic query) async {
    return await httpGet('/me/shot/video', query);
  }
}
