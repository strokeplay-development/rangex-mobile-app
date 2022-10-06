import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/app/app_theme.dart';
import 'package:rangex/authentication/bloc/auth_bloc.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/authentication/repositories/user_repository.dart';
import 'package:rangex/routes/app_router.gr.dart';
import 'package:rangex/routes/router_guards.dart';
import 'package:easy_localization/easy_localization.dart';

/// App
/// 글로벌 레포지토리 등록
/// 글로벌 블록 등록
class App extends StatelessWidget {
  const App({
    Key? key,
    required this.authRepository,
    required this.userRepository,
  }) : super(key: key);

  final AuthRepository authRepository;
  final UserRepository userRepository;

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider.value(value: authRepository),
        RepositoryProvider.value(value: userRepository),
      ],
      child: BlocProvider(
        create: (context) => AuthBloc(
          authRepository: authRepository,
          userRepository: userRepository,
        ),
        child: const AppView(),
      ),
    );
  }
}

/// AppView
/// 라우터 앱 생성
class AppView extends StatefulWidget {
  const AppView({Key? key}) : super(key: key);

  @override
  State<AppView> createState() => _AppViewState();
}

class _AppViewState extends State<AppView> {
  late final AuthBloc _authBloc;
  late final AppRouter _appRouter;

  @override
  void initState() {
    _authBloc = BlocProvider.of<AuthBloc>(context);
    _appRouter =
        AppRouter(checkIfAuthenticated: CheckIfAuthenticated(_authBloc));
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    /// 스테이터스 바를 하얀색으로 바꿈
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light);

    return MaterialApp.router(
      routerDelegate: _appRouter.delegate(),
      routeInformationParser: _appRouter.defaultRouteParser(),
      theme: darkTheme,
      locale: context.locale,
      localizationsDelegates: context.localizationDelegates,
      supportedLocales: context.supportedLocales,
    );
  }
}
