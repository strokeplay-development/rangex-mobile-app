import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/authentication/repositories/auth_repository.dart';
import 'package:webview_flutter/webview_flutter.dart';

class ReactWebview extends StatefulWidget {
  const ReactWebview({Key? key, required this.initialUrl}) : super(key: key);

  final String initialUrl;

  @override
  State<ReactWebview> createState() => _ReactWebviewState();
}

class _ReactWebviewState extends State<ReactWebview> {
  String get _initialUrl => widget.initialUrl;

  @override
  void initState() {
    if (Platform.isAndroid) {
      WebView.platform = SurfaceAndroidWebView();
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: null,
      child: WebView(
        initialUrl: _initialUrl,
        javascriptMode: JavascriptMode.unrestricted,
        onWebViewCreated: (WebViewController ctrl) async {
          final authRepo = RepositoryProvider.of<AuthRepository>(context);

          ctrl.runJavascript(await tokensToCookie(authRepo));
        },
      ),
    );
  }

  Future<String> tokensToCookie(AuthRepository authRepo) async {
    final accessToken = await authRepo.accessToken;
    final refreshToken = await authRepo.refreshToken;

    print(
        "document.cookie = 'accessToken=$accessToken'; 'refreshToken=$refreshToken'");

    return "document.cookie = 'refreshToken=$refreshToken; accessToken=$accessToken;'";
  }
}
