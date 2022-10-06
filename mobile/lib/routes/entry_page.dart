import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/authentication/bloc/auth_bloc.dart';
import 'package:rangex/authentication/bloc/auth_state.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';

class EntryPage extends StatefulWidget {
  const EntryPage({Key? key}) : super(key: key);

  @override
  State<EntryPage> createState() => _EntryPageState();
}

class _EntryPageState extends State<EntryPage> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    final auth = BlocProvider.of<AuthBloc>(context).state.status;
    print("실행 후 $auth");

    if (auth == AuthStatus.unauthenticated) {
      context.router.replaceNamed('/welcome');
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        print("dd?");
        final String entryPath =
            state.status == AuthStatus.authenticated ? '/main' : '/welcome';
        context.router.replaceNamed(entryPath);
      },
      child: Container(),
    );
  }
}
