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

      return null;
    }
  }

  FutureOr<User?> signUp(Map<String, dynamic> userInfo) async {
    try {
      print('<Sign up> $userInfo');
      final res = await AuthHttp().signup(userInfo);
      return User.fromJson(res.data);
    } catch (e) {
      print(e);

      return null;
    }
  }

  FutureOr<User?> modifyOptionals(Map<String, dynamic> userInfo) async {
    try {
      print('<Modify Optionals> $userInfo');

      final res = await AuthHttp().modifyNe(userInfo);

      return User.fromJson(res.data);
    } catch (e) {
      throw Exception(e);
    }
  }
}
