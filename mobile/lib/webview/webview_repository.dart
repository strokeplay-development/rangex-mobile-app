import 'package:webview_flutter/webview_flutter.dart';

typedef UrlChangeHandler = void Function(String url);

class WebviewRepository {
  WebviewRepository();

  late WebViewController _controller;

  final List<String> rootUrls = [
    'http://localhost:3000/home',
    'http://localhost:3000/swings',
    'http://localhost:3000/more'
  ];

  final List<String> rootPaths = ['/home', '/swings', '/more'];

  WebView getWebviewWidget({
    Function? onCreated,
    UrlChangeHandler? onUrlChanged,
  }) {
    return WebView(
      javascriptMode: JavascriptMode.unrestricted,
      initialUrl: rootUrls[0],
      onWebViewCreated: (control) {
        _controller = control;

        if (onCreated != null) {
          onCreated();
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
        )
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
