// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************
//
// ignore_for_file: type=lint

import 'package:auto_route/auto_route.dart' as _i8;
import 'package:flutter/material.dart' as _i9;

import '../authentication/views/login_page.dart' as _i4;
import '../authentication/views/signup_page.dart' as _i3;
import '../authentication/views/welcome_page.dart' as _i2;
import '../screens/root_wrap.dart' as _i5;
import '../screens/swing/views/shot_video.dart' as _i6;
import '../screens/thirdparty_wrap.dart' as _i7;
import 'entry_page.dart' as _i1;
import 'router_guards.dart' as _i10;

class AppRouter extends _i8.RootStackRouter {
  AppRouter(
      {_i9.GlobalKey<_i9.NavigatorState>? navigatorKey,
      required this.checkIfAuthenticated})
      : super(navigatorKey);

  final _i10.CheckIfAuthenticated checkIfAuthenticated;

  @override
  final Map<String, _i8.PageFactory> pagesMap = {
    EntryRouter.name: (routeData) {
      return _i8.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i1.EntryPage());
    },
    WelcomeRouter.name: (routeData) {
      return _i8.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i2.WelcomePage());
    },
    SignupRouter.name: (routeData) {
      return _i8.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i3.SignupPage());
    },
    LoginRouter.name: (routeData) {
      return _i8.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i4.LoginPage());
    },
    RootWrapRouter.name: (routeData) {
      return _i8.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i5.RootWrap());
    },
    VideoRouter.name: (routeData) {
      return _i8.MaterialPageX<dynamic>(
          routeData: routeData, child: const _i6.VideoPage());
    },
    ThirdPartyRouter.name: (routeData) {
      final args = routeData.argsAs<ThirdPartyRouterArgs>();
      return _i8.MaterialPageX<dynamic>(
          routeData: routeData,
          child: _i7.ThirdpartyWrap(args.url, key: args.key));
    }
  };

  @override
  List<_i8.RouteConfig> get routes => [
        _i8.RouteConfig(EntryRouter.name, path: '/'),
        _i8.RouteConfig(WelcomeRouter.name, path: '/welcome'),
        _i8.RouteConfig(SignupRouter.name, path: '/signup'),
        _i8.RouteConfig(LoginRouter.name,
            path: '/login', guards: [checkIfAuthenticated]),
        _i8.RouteConfig(RootWrapRouter.name, path: '/main'),
        _i8.RouteConfig(VideoRouter.name, path: '/video'),
        _i8.RouteConfig(ThirdPartyRouter.name, path: '/third')
      ];
}

/// generated route for
/// [_i1.EntryPage]
class EntryRouter extends _i8.PageRouteInfo<void> {
  const EntryRouter() : super(EntryRouter.name, path: '/');

  static const String name = 'EntryRouter';
}

/// generated route for
/// [_i2.WelcomePage]
class WelcomeRouter extends _i8.PageRouteInfo<void> {
  const WelcomeRouter() : super(WelcomeRouter.name, path: '/welcome');

  static const String name = 'WelcomeRouter';
}

/// generated route for
/// [_i3.SignupPage]
class SignupRouter extends _i8.PageRouteInfo<void> {
  const SignupRouter() : super(SignupRouter.name, path: '/signup');

  static const String name = 'SignupRouter';
}

/// generated route for
/// [_i4.LoginPage]
class LoginRouter extends _i8.PageRouteInfo<void> {
  const LoginRouter() : super(LoginRouter.name, path: '/login');

  static const String name = 'LoginRouter';
}

/// generated route for
/// [_i5.RootWrap]
class RootWrapRouter extends _i8.PageRouteInfo<void> {
  const RootWrapRouter() : super(RootWrapRouter.name, path: '/main');

  static const String name = 'RootWrapRouter';
}

/// generated route for
/// [_i6.VideoPage]
class VideoRouter extends _i8.PageRouteInfo<void> {
  const VideoRouter() : super(VideoRouter.name, path: '/video');

  static const String name = 'VideoRouter';
}

/// generated route for
/// [_i7.ThirdpartyWrap]
class ThirdPartyRouter extends _i8.PageRouteInfo<ThirdPartyRouterArgs> {
  ThirdPartyRouter({required String url, _i9.Key? key})
      : super(ThirdPartyRouter.name,
            path: '/third', args: ThirdPartyRouterArgs(url: url, key: key));

  static const String name = 'ThirdPartyRouter';
}

class ThirdPartyRouterArgs {
  const ThirdPartyRouterArgs({required this.url, this.key});

  final String url;

  final _i9.Key? key;

  @override
  String toString() {
    return 'ThirdPartyRouterArgs{url: $url, key: $key}';
  }
}
