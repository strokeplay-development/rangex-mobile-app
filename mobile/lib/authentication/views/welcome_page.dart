import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';

class WelcomePage extends StatefulWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  State<WelcomePage> createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
                onPressed: () => AutoRouter.of(context).pushNamed('/login'),
                child: const Text('로그인')),
            ElevatedButton(
                onPressed: () => AutoRouter.of(context).pushNamed('/signup'),
                child: const Text('회원가입')),
          ],
        ),
      ),
    );
  }
}
