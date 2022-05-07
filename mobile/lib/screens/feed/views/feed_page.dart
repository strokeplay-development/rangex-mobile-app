import 'package:flutter/material.dart';
import 'package:mobile/widgets/react_webview.dart';

class FeedPage extends StatefulWidget {
  const FeedPage({Key? key}) : super(key: key);

  @override
  State<FeedPage> createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: ReactWebview(initialUrl: 'http://localhost:3000'),
    );
  }
}
