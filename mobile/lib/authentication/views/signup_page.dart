import 'package:flutter/material.dart';
import 'package:mobile/authentication/widgets/signup_form.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('회원가입'),
      ),
      body: const SignupForm(),
    );
  }
}
