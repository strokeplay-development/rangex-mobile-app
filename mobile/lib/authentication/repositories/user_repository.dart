import 'dart:async';

import 'package:rangex/api/api.dart';
import 'package:rangex/authentication/models/user.dart';

class UserRepository {
  User? _user;

  FutureOr<User?> getUser() async {
    print('유저정보 가져오기');
    if (_user != null) return _user;

    try {
      final res = await AuthHttp().fetchMe();

      return _user = User.fromJson(res.data);
    } catch (e) {
      print(e);
    }
  }

  FutureOr<User?> signUp(User userInfo) async {
    try {
      final res = await AuthHttp().signup(userInfo.toJson());
      return User.fromJson(res.data);
    } catch (e) {
      print(e);
    }
  }
}
