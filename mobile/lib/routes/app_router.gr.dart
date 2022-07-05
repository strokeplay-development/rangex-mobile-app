// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************
//
// ignore_for_file: type=lint

import 'package:auto_route/auto_route.dart' as _i6;
import 'package:flutter/material.dart' as _i7;

import '../authentication/views/login_page.dart' as _i4;
import '../authentication/views/signup_page.dart' as _i3;
import '../authentication/views/welcome_page.dart' as _i2;
import '../screens/root_wrap.dart' as _i5;
import 'entry_page.dart' as _i1;
import 'router_guards.dart' as _i8;

class AppRouter extends _i6.RootStackRouter {
  AppRouter(
      {_i7.GlobalKey<_i7.NavigatorState>? navigatorKey,
      required this.checkIfAuthenticated})
      : super(navigatorKey);

  final _i8.CheckIfAuthenticated checkIfAuthenticated;

  @override
  final Map<String, _i6.PageFactory> pagesMap = {
    EntryRouter.name: (routeData) {
      return _i6.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i1.EntryPage());
    },
    WelcomeRouter.name: (routeData) {
      return _i6.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i2.WelcomePage());
    },
    SignupRouter.name: (routeData) {
      return _i6.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.SignupPage());
    },
    LoginRouter.name: (routeData) {
      return _i6.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i4.LoginPage());
    },
    RootWrapRouter.name: (routeData) {
      return _i6.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i5.RootWrap());
    }
  };

  @override
  List<_i6.RouteConfig> get routes => [
        _i6.RouteConfig(EntryRouter.name, path: '/'),
        _i6.RouteConfig(WelcomeRouter.name, path: '/welcome'),
        _i6.RouteConfig(SignupRouter.name, path: '/signup'),
        _i6.RouteConfig(LoginRouter.name,
            path: '/login', guards: [checkIfAuthenticated]),
        _i6.RouteConfig(RootWrapRouter.name, path: '/main')
      ];
}

/// generated route for
/// [_i1.EntryPage]
class EntryRouter extends _i6.PageRouteInfo<void> {
  const EntryRouter() : super(EntryRouter.name, path: '/');

  static const String name = 'EntryRouter';
}

/// generated route for
/// [_i2.WelcomePage]
class WelcomeRouter extends _i6.PageRouteInfo<void> {
  const WelcomeRouter() : super(WelcomeRouter.name, path: '/welcome');

  static const String name = 'WelcomeRouter';
}

/// generated route for
/// [_i3.SignupPage]
class SignupRouter extends _i6.PageRouteInfo<void> {
  const SignupRouter() : super(SignupRouter.name, path: '/signup');

  static const String name = 'SignupRouter';
}

/// generated route for
/// [_i4.LoginPage]
class LoginRouter extends _i6.PageRouteInfo<void> {
  const LoginRouter() : super(LoginRouter.name, path: '/login');

  static const String name = 'LoginRouter';
}

/// generated route for
/// [_i5.RootWrap]
class RootWrapRouter extends _i6.PageRouteInfo<void> {
  const RootWrapRouter() : super(RootWrapRouter.name, path: '/main');

  static const String name = 'RootWrapRouter';
}
