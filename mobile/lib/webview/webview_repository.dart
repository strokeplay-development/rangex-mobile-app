import 'dart:convert';
import 'dart:io';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/authentication/repositories/user_repository.dart';
import 'package:rangex/utils/auth.dart';
import 'package:webview_flutter/webview_flutter.dart';

typedef UrlChangeHandler = void Function(String url);

class WebviewRepository {
  WebviewRepository({required String baseUrl}) : _baseUrl = baseUrl {
    rootUrls = [
      '$_baseUrl/home',
      '$_baseUrl/swings',
      '$_baseUrl/more',
    ];
  }

  final String _baseUrl;

  late WebViewController _controller;

  List<String> rootUrls = [];

  final List<String> rootPaths = ['/home', '/swings', '/more'];

  WebView getWebviewWidget({
    required BuildContext context,
    Function? onCreated,
    UrlChangeHandler? onUrlChanged,
    List<WebViewCookie> cookies = const [],
  }) {
    if (Platform.isAndroid) WebView.platform = AndroidWebView();

    return WebView(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      javascriptMode: JavascriptMode.unrestricted,
      initialUrl: rootUrls[0],
      initialCookies: cookies,
      onWebViewCreated: (control) {
        _controller = control;

        if (onCreated != null) {
          onCreated();
        }
      },
      onPageFinished: (url) async {
        final webCookies =
            await _controller.runJavascriptReturningResult('document.cookie');
        final mappedCookie = AuthUtils.getCookies(webCookies);

        String? accessToken;
        String? refreshToken;

        accessToken = mappedCookie?['accessToken'];
        refreshToken = mappedCookie?['refreshToken'];

        final authRepo = RepositoryProvider.of<AuthRepository>(context);

        if (accessToken == null) {
          final setAccess = AuthUtils.jsStringSetCookie(
            'accessToken',
            await authRepo.accessToken,
          );
          _controller.runJavascript(setAccess);
        }

        if (refreshToken == null) {
          final setRefresh = AuthUtils.jsStringSetCookie(
            'refreshToken',
            await authRepo.refreshToken,
          );
          _controller.runJavascript(setRefresh);
        }
      },
      navigationDelegate: (req) {
        return NavigationDecision.navigate;
      },
      gestureNavigationEnabled: true,
      javascriptChannels: {
        JavascriptChannel(
          name: 'LocationChanged',
          onMessageReceived: (message) {
            if (onUrlChanged != null) {
              onUrlChanged(message.message);
            }
          },
        ),
        JavascriptChannel(
          name: 'LogoutRequested',
          onMessageReceived: (message) {
            RepositoryProvider.of<AuthRepository>(context).logOut();
            context.router.popUntil((route) => false);
            context.router.pushNamed('/welcome');
          },
        ),
        JavascriptChannel(
          name: 'JoinRequested',
          onMessageReceived: (message) async {
            final me =
                await RepositoryProvider.of<UserRepository>(context).getUser();

            if (me != null) {
              RepositoryProvider.of<AuthRepository>(context).joinShop(
                userID: me.id!,
                joinCode: int.parse(message.message),
              );
            }
          },
        ),
        JavascriptChannel(
          name: 'ModifyUserRequested',
          onMessageReceived: (message) async {
            await RepositoryProvider.of<UserRepository>(context)
                .modifyOptionals(jsonDecode(message.message));
          },
        ),
      },
    );
  }

  // Controller

  Future<bool> get canGoBack {
    return _controller.canGoBack();
  }

  void goBack() {
    _controller.goBack();
  }

  void loadRootUrl(int index) {
    _controller.loadUrl(rootUrls[index]);
  }
}
