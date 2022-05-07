import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/authentication/bloc/auth_bloc.dart';
import 'package:mobile/authentication/bloc/auth_event.dart';
import 'package:mobile/authentication/bloc/auth_state.dart';
import 'package:mobile/authentication/repositories/auth_repository.dart';

class MorePage extends StatefulWidget {
  const MorePage({Key? key}) : super(key: key);

  @override
  State<MorePage> createState() => _MorePageState();
}

class _MorePageState extends State<MorePage> {
  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state.status == AuthStatus.unauthenticated) {
          context.router.popUntilRoot();
          context.router.replaceNamed('/welcome');
        }
      },
      child: Center(
        child: ElevatedButton(
          onPressed: () =>
              BlocProvider.of<AuthBloc>(context).add(AuthLogoutRequested()),
          child: const Text('로그아웃'),
        ),
      ),
    );
  }
}
