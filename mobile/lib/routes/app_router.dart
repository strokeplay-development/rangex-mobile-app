import 'package:auto_route/annotations.dart';
import 'package:auto_route/auto_route.dart';
import 'package:rangex/authentication/views/login_page.dart';
import 'package:rangex/authentication/views/signup_page.dart';
import 'package:rangex/authentication/views/social_login.dart';
import 'package:rangex/authentication/views/welcome_page.dart';
import 'package:rangex/routes/entry_page.dart';
import 'package:rangex/routes/router_guards.dart';
import 'package:rangex/screens/root_wrap.dart';

@MaterialAutoRouter(
  replaceInRouteName: 'Page,Route',
  routes: <AutoRoute>[
    /// Entry
    AutoRoute<dynamic>(
      initial: true,
      path: '/',
      name: 'EntryRouter',
      page: EntryPage,
    ),

    /// Authentication Routes
    /// [Welcome, Login, Signup]
    AutoRoute<dynamic>(
      path: '/welcome',
      name: 'WelcomeRouter',
      page: WelcomePage,
    ),
    AutoRoute<dynamic>(
      path: '/signup',
      name: 'SignupRouter',
      page: SignupPage,
    ),
    AutoRoute<dynamic>(
      path: '/login',
      name: 'LoginRouter',
      page: LoginPage,
      guards: [CheckIfAuthenticated],
    ),
    AutoRoute<dynamic>(
      path: '/login/social',
      name: 'SocialLoginRouter',
      page: SocialLoginPage,
    ),

    /// Main Routes
    /// [Feed, Swing, More]
    AutoRoute<dynamic>(
      path: '/main',
      name: 'RootWrapRouter',
      page: RootWrap,
    ),
  ],
)
class $AppRouter {}
