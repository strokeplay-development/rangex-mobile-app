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

  /// 웹뷰 위젯 생성하기
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
      navigationDelegate: (req) {
        return NavigationDecision.navigate;
      },
      gestureNavigationEnabled: true,

      /// 웹뷰 생성 후
      onWebViewCreated: (control) {
        _controller = control;

        if (onCreated != null) {
          onCreated();
        }
      },

      /// 웹뷰 페이지 로드 후
      onPageFinished: (url) async {
        final webCookies =
            await _controller.runJavascriptReturningResult('document.cookie');
        final mappedCookie = AuthUtils.getCookies(webCookies);

        String? accessToken = mappedCookie?['accessToken'];
        String? refreshToken = mappedCookie?['refreshToken'];

        final authRepo = RepositoryProvider.of<AuthRepository>(context);

        String? newAccessToken = await authRepo.accessToken;
        String? newRefreshToken = await authRepo.refreshToken;

        /// 새 액세스 토큰 셋팅
        if (accessToken == null ||
            accessToken == '' ||
            accessToken != newAccessToken) {
          final setAccess = AuthUtils.jsStringSetCookie(
            'accessToken',
            newAccessToken,
          );
          _controller.runJavascript(setAccess);
        }

        /// 새 리프레쉬 토큰 셋팅
        if (refreshToken == null ||
            refreshToken == '' ||
            refreshToken != newRefreshToken) {
          final setRefresh = AuthUtils.jsStringSetCookie(
            'refreshToken',
            newRefreshToken,
          );
          _controller.runJavascript(setRefresh);
        }
      },

      /// 웹뷰 메시지 처리
      javascriptChannels: {
        JavascriptChannel(
          name: 'ResponseReceived',
          onMessageReceived: (message) {
            print(message.message);
          },
        ),
        JavascriptChannel(
          name: 'WebviewMounted',
          onMessageReceived: (message) {
            print(message.message);
          },
        ),
        JavascriptChannel(
          name: 'LocationChanged',
          onMessageReceived: (message) {
            print('[Current Path] ${message.message}');
            if (onUrlChanged != null) {
              onUrlChanged(message.message);
            }
          },
        ),
        JavascriptChannel(
          name: 'LogoutRequested',
          onMessageReceived: (message) async {
            print('[Logout Requested]');
            await RepositoryProvider.of<AuthRepository>(context).logOut();
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
