import 'package:auto_route/annotations.dart';
import 'package:auto_route/auto_route.dart';
import 'package:mobile/authentication/views/login_page.dart';
import 'package:mobile/authentication/views/signup_page.dart';
import 'package:mobile/authentication/views/welcome_page.dart';
import 'package:mobile/routes/entry_page.dart';
import 'package:mobile/routes/router_guards.dart';
import 'package:mobile/screens/feed/views/feed_page.dart';
import 'package:mobile/screens/more/views/more_page.dart';
import 'package:mobile/screens/root_wrap.dart';
import 'package:mobile/screens/swing/views/swing_page.dart';

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

    /// Main Routes
    /// [Feed, Swing, More]
    AutoRoute<dynamic>(
      path: '/main',
      name: 'RootWrapRouter',
      page: RootWrap,
      children: [
        AutoRoute<dynamic>(
          guards: [CheckIfAuthenticated],
          path: 'feed',
          name: 'FeedRouter',
          page: FeedPage,
          meta: <String, String>{'title': 'HOME'},
        ),
        AutoRoute<dynamic>(
          guards: [CheckIfAuthenticated],
          path: 'swing',
          name: 'SwingRouter',
          page: SwingPage,
          meta: <String, String>{'title': 'SWING'},
        ),
        AutoRoute<dynamic>(
          guards: [CheckIfAuthenticated],
          path: 'more',
          name: 'MoreRouter',
          page: MorePage,
          meta: <String, String>{'title': 'MORE'},
        ),
        RedirectRoute(path: '*', redirectTo: 'feed')
      ],
    ),
  ],
)
class $AppRouter {}
