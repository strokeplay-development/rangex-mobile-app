import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/app/app.dart';
import 'package:mobile/authentication/repositories/auth_repository.dart';
import 'package:mobile/authentication/repositories/user_repository.dart';

const secureStorage = FlutterSecureStorage();
void main() {
  runApp(App(
    authRepository: AuthRepository(secureStorage),
    userRepository: UserRepository(),
  ));
}
