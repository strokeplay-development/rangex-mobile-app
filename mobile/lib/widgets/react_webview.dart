import 'dart:io';

import 'package:flutter/material.dart';
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
      ),
    );
  }
}
