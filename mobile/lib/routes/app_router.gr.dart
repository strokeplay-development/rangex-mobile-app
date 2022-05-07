// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************
//
// ignore_for_file: type=lint

import 'package:auto_route/auto_route.dart' as _i9;
import 'package:flutter/material.dart' as _i10;

import '../authentication/views/login_page.dart' as _i4;
import '../authentication/views/signup_page.dart' as _i3;
import '../authentication/views/welcome_page.dart' as _i2;
import '../screens/feed/views/feed_page.dart' as _i6;
import '../screens/more/views/more_page.dart' as _i8;
import '../screens/root_wrap.dart' as _i5;
import '../screens/swing/views/swing_page.dart' as _i7;
import 'entry_page.dart' as _i1;
import 'router_guards.dart' as _i11;

class AppRouter extends _i9.RootStackRouter {
  AppRouter(
      {_i10.GlobalKey<_i10.NavigatorState>? navigatorKey,
      required this.checkIfAuthenticated})
      : super(navigatorKey);

  final _i11.CheckIfAuthenticated checkIfAuthenticated;

  @override
  final Map<String, _i9.PageFactory> pagesMap = {
    EntryRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i1.EntryPage());
    },
    WelcomeRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i2.WelcomePage());
    },
    SignupRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.SignupPage());
    },
    LoginRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i4.LoginPage());
    },
    RootWrapRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i5.RootWrap());
    },
    FeedRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i6.FeedPage());
    },
    SwingRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i7.SwingPage());
    },
    MoreRouter.name: (routeData) {
      return _i9.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i8.MorePage());
    }
  };

  @override
  List<_i9.RouteConfig> get routes => [
        _i9.RouteConfig(EntryRouter.name, path: '/'),
        _i9.RouteConfig(WelcomeRouter.name, path: '/welcome'),
        _i9.RouteConfig(SignupRouter.name, path: '/signup'),
        _i9.RouteConfig(LoginRouter.name,
            path: '/login', guards: [checkIfAuthenticated]),
        _i9.RouteConfig(RootWrapRouter.name, path: '/main', children: [
          _i9.RouteConfig(FeedRouter.name,
              path: 'feed',
              parent: RootWrapRouter.name,
              meta: <String, dynamic>{'title': 'HOME'},
              guards: [checkIfAuthenticated]),
          _i9.RouteConfig(SwingRouter.name,
              path: 'swing',
              parent: RootWrapRouter.name,
              meta: <String, dynamic>{'title': 'SWING'},
              guards: [checkIfAuthenticated]),
          _i9.RouteConfig(MoreRouter.name,
              path: 'more',
              parent: RootWrapRouter.name,
              meta: <String, dynamic>{'title': 'MORE'},
              guards: [checkIfAuthenticated]),
          _i9.RouteConfig('*#redirect',
              path: '*',
              parent: RootWrapRouter.name,
              redirectTo: 'feed',
              fullMatch: true)
        ])
      ];
}

/// generated route for
/// [_i1.EntryPage]
class EntryRouter extends _i9.PageRouteInfo<void> {
  const EntryRouter() : super(EntryRouter.name, path: '/');

  static const String name = 'EntryRouter';
}

/// generated route for
/// [_i2.WelcomePage]
class WelcomeRouter extends _i9.PageRouteInfo<void> {
  const WelcomeRouter() : super(WelcomeRouter.name, path: '/welcome');

  static const String name = 'WelcomeRouter';
}

/// generated route for
/// [_i3.SignupPage]
class SignupRouter extends _i9.PageRouteInfo<void> {
  const SignupRouter() : super(SignupRouter.name, path: '/signup');

  static const String name = 'SignupRouter';
}

/// generated route for
/// [_i4.LoginPage]
class LoginRouter extends _i9.PageRouteInfo<void> {
  const LoginRouter() : super(LoginRouter.name, path: '/login');

  static const String name = 'LoginRouter';
}

/// generated route for
/// [_i5.RootWrap]
class RootWrapRouter extends _i9.PageRouteInfo<void> {
  const RootWrapRouter({List<_i9.PageRouteInfo>? children})
      : super(RootWrapRouter.name, path: '/main', initialChildren: children);

  static const String name = 'RootWrapRouter';
}

/// generated route for
/// [_i6.FeedPage]
class FeedRouter extends _i9.PageRouteInfo<void> {
  const FeedRouter() : super(FeedRouter.name, path: 'feed');

  static const String name = 'FeedRouter';
}

/// generated route for
/// [_i7.SwingPage]
class SwingRouter extends _i9.PageRouteInfo<void> {
  const SwingRouter() : super(SwingRouter.name, path: 'swing');

  static const String name = 'SwingRouter';
}

/// generated route for
/// [_i8.MorePage]
class MoreRouter extends _i9.PageRouteInfo<void> {
  const MoreRouter() : super(MoreRouter.name, path: 'more');

  static const String name = 'MoreRouter';
}
