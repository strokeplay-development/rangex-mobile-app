import 'package:flutter/material.dart';
import 'package:mobile/widgets/react_webview.dart';

class SwingPage extends StatefulWidget {
  const SwingPage({Key? key}) : super(key: key);

  @override
  State<SwingPage> createState() => _SwingPageState();
}

class _SwingPageState extends State<SwingPage> {
  @override
  Widget build(BuildContext context) {
    return const ReactWebview(initialUrl: 'https://feature.dev-rangex.com');
  }
}
