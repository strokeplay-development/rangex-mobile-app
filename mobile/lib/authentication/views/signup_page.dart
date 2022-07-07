import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:auto_route/auto_route.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    late WebViewController _ctrler;

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
        child: Stack(
          children: [
            WebView(
              backgroundColor: Theme.of(context).scaffoldBackgroundColor,
              initialUrl: '${dotenv.env['WEBVIEW_BASE_URL']}/signup/required',
              onWebViewCreated: (controller) {
                _ctrler = controller;
              },
              javascriptMode: JavascriptMode.unrestricted,
              javascriptChannels: {
                JavascriptChannel(
                  name: 'SignupCompleted',
                  onMessageReceived: (message) {
                    context.router.popUntil((route) => false);
                    context.router.pushNamed('/welcome');
                  },
                ),
              },
            ),
            Positioned(
              top: 4,
              left: 6,
              child: IconButton(
                icon: const Icon(
                  Icons.arrow_back,
                  color: Colors.white,
                ),
                onPressed: () async {
                  if (await _ctrler.canGoBack()) {
                    _ctrler.goBack();
                  } else {
                    context.router.pop();
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
