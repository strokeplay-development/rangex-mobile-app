import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class ThirdpartyWrap extends StatefulWidget {
  const ThirdpartyWrap(String url, {Key? key})
      : _url = url,
        super(key: key);

  final String _url;

  @override
  State<ThirdpartyWrap> createState() => _ThirdpartyWrapState();
}

class _ThirdpartyWrapState extends State<ThirdpartyWrap> {
  late WebViewController _ctrler;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(elevation: 2.0),
      body: WebView(
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        initialUrl: widget._url,
        onWebViewCreated: (controller) {
          _ctrler = controller;
        },
        javascriptMode: JavascriptMode.unrestricted,
      ),
    );
  }
}
