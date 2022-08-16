// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************
//
// ignore_for_file: type=lint

import 'package:auto_route/auto_route.dart' as _i7;
import 'package:flutter/material.dart' as _i8;

import '../authentication/views/login_page.dart' as _i4;
import '../authentication/views/signup_page.dart' as _i3;
import '../authentication/views/social_login.dart' as _i5;
import '../authentication/views/welcome_page.dart' as _i2;
import '../screens/root_wrap.dart' as _i6;
import 'entry_page.dart' as _i1;
import 'router_guards.dart' as _i9;

class AppRouter extends _i7.RootStackRouter {
  AppRouter(
      {_i8.GlobalKey<_i8.NavigatorState>? navigatorKey,
      required this.checkIfAuthenticated})
      : super(navigatorKey);

  final _i9.CheckIfAuthenticated checkIfAuthenticated;

  @override
  final Map<String, _i7.PageFactory> pagesMap = {
    EntryRouter.name: (routeData) {
      return _i7.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i1.EntryPage());
    },
    WelcomeRouter.name: (routeData) {
      return _i7.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i2.WelcomePage());
    },
    SignupRouter.name: (routeData) {
      return _i7.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.SignupPage());
    },
    LoginRouter.name: (routeData) {
      return _i7.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i4.LoginPage());
    },
    SocialLoginRouter.name: (routeData) {
      final pathParams = routeData.inheritedPathParams;
      final args = routeData.argsAs<SocialLoginRouterArgs>(
          orElse: () => SocialLoginRouterArgs(
              loginType: pathParams.getString('loginType')));
      return _i7.MaterialPageX<dynamic>(
          routeData: routeData,
          child: _i5.SocialLoginPage(key: args.key, loginType: args.loginType));
    },
    RootWrapRouter.name: (routeData) {
      return _i7.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i6.RootWrap());
    }
  };

  @override
  List<_i7.RouteConfig> get routes => [
        _i7.RouteConfig(EntryRouter.name, path: '/'),
        _i7.RouteConfig(WelcomeRouter.name, path: '/welcome'),
        _i7.RouteConfig(SignupRouter.name, path: '/signup'),
        _i7.RouteConfig(LoginRouter.name,
            path: '/login', guards: [checkIfAuthenticated]),
        _i7.RouteConfig(SocialLoginRouter.name, path: '/login/social'),
        _i7.RouteConfig(RootWrapRouter.name, path: '/main')
      ];
}

/// generated route for
/// [_i1.EntryPage]
class EntryRouter extends _i7.PageRouteInfo<void> {
  const EntryRouter() : super(EntryRouter.name, path: '/');

  static const String name = 'EntryRouter';
}

/// generated route for
/// [_i2.WelcomePage]
class WelcomeRouter extends _i7.PageRouteInfo<void> {
  const WelcomeRouter() : super(WelcomeRouter.name, path: '/welcome');

  static const String name = 'WelcomeRouter';
}

/// generated route for
/// [_i3.SignupPage]
class SignupRouter extends _i7.PageRouteInfo<void> {
  const SignupRouter() : super(SignupRouter.name, path: '/signup');

  static const String name = 'SignupRouter';
}

/// generated route for
/// [_i4.LoginPage]
class LoginRouter extends _i7.PageRouteInfo<void> {
  const LoginRouter() : super(LoginRouter.name, path: '/login');

  static const String name = 'LoginRouter';
}

/// generated route for
/// [_i5.SocialLoginPage]
class SocialLoginRouter extends _i7.PageRouteInfo<SocialLoginRouterArgs> {
  SocialLoginRouter({_i8.Key? key, required String loginType})
      : super(SocialLoginRouter.name,
            path: '/login/social',
            args: SocialLoginRouterArgs(key: key, loginType: loginType),
            rawPathParams: {'loginType': loginType});

  static const String name = 'SocialLoginRouter';
}

class SocialLoginRouterArgs {
  const SocialLoginRouterArgs({this.key, required this.loginType});

  final _i8.Key? key;

  final String loginType;

  @override
  String toString() {
    return 'SocialLoginRouterArgs{key: $key, loginType: $loginType}';
  }
}

/// generated route for
/// [_i6.RootWrap]
class RootWrapRouter extends _i7.PageRouteInfo<void> {
  const RootWrapRouter() : super(RootWrapRouter.name, path: '/main');

  static const String name = 'RootWrapRouter';
}
