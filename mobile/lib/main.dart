import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile/app/app.dart';
import 'package:mobile/authentication/repositories/auth_repository.dart';
import 'package:mobile/authentication/repositories/user_repository.dart';

const secureStorage = FlutterSecureStorage();

void main() async {
  await dotenv.load(fileName: '.env');

  runApp(App(
    authRepository: AuthRepository(secureStorage),
    userRepository: UserRepository(),
  ));
}
