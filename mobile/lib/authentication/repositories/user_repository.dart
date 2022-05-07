import 'dart:async';

import 'package:mobile/api/api.dart';
import 'package:mobile/authentication/models/user.dart';

class UserRepository {
  User? _user;

  FutureOr<User?> getUser() async {
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
      print(res.data);
      return User.fromJson(res.data);
    } catch (e) {
      print(e);
    }
  }
}
