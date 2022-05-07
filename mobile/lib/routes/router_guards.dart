import 'package:auto_route/auto_route.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/authentication/bloc/auth_bloc.dart';
import 'package:mobile/authentication/bloc/auth_state.dart';
import 'package:mobile/authentication/repositories/auth_repository.dart';

class CheckIfAuthenticated extends AutoRouteGuard {
  CheckIfAuthenticated(AuthBloc authBloc) : _authBloc = authBloc;

  final AuthBloc _authBloc;

  @override
  void onNavigation(NavigationResolver resolver, StackRouter router) {
    print('가드실행중');
    print(_authBloc.state.status);
    BlocListener(
      bloc: _authBloc,
      listener: (_, AuthState state) {
        if (state.status == AuthStatus.authenticated) {
          resolver.next();
        }
        print(router.current);
      },
    );
    resolver.next();
  }
}
