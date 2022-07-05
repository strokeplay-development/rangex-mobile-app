import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/app/app_theme.dart';
import 'package:mobile/screens/feed/views/feed_appbar.dart';
import 'package:mobile/screens/more/views/more_appbar.dart';
import 'package:mobile/screens/swing/views/swings_appbar.dart';
import 'package:mobile/webview/webview_bloc.dart';
import 'package:mobile/webview/webview_event.dart';
import 'package:mobile/webview/webview_repository.dart';
import 'package:mobile/webview/webview_state.dart';

class RootWrap extends StatefulWidget {
  const RootWrap({Key? key}) : super(key: key);

  @override
  State<RootWrap> createState() => _RootWrapState();
}

class _RootWrapState extends State<RootWrap> {
  final _webviewRepository = WebviewRepository();
  late WebviewBloc? _webviewBloc;

  int selectedTap = 0;
  List<int> tapIndexStack = [];
  double statusBarHeight = 0;
  List<AppBar> appBars = [feedAppBar, swingsAppBar, moreAppBar];

  @override
  void initState() {
    _webviewBloc = WebviewBloc(webviewRepository: _webviewRepository);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<WebviewBloc, WebviewState>(
      bloc: _webviewBloc,
      builder: (context, state) {
        statusBarHeight =
            state is WebviewStateDeep ? MediaQuery.of(context).padding.top : 0;

        return WillPopScope(
          child: Scaffold(
            appBar: state is WebviewStateRoot ? appBars[selectedTap] : null,
            body: Padding(
              padding: EdgeInsets.only(top: statusBarHeight),
              child: Stack(children: [
                _webviewRepository.getWebviewWidget(
                  context: context,
                  onUrlChanged: (changedUrl) {
                    setState(() {
                      _webviewBloc?.add(WebviewUrlChanged(changedUrl));
                    });
                  },
                ),
                Visibility(
                  visible: state is! WebviewStateRoot,
                  child: Positioned(
                    top: 4,
                    left: 6,
                    child: IconButton(
                      icon: const Icon(
                        Icons.arrow_back,
                        color: Colors.white,
                      ),
                      onPressed: () async {
                        if (await _webviewRepository.canGoBack) {
                          if (state is WebviewStateRoot) {
                            setState(() {
                              selectedTap = tapIndexStack.removeLast();
                            });
                          }
                          _webviewRepository.goBack();
                        }
                      },
                    ),
                  ),
                ),
              ]),
            ),
            bottomNavigationBar: state is WebviewStateRoot
                ? Container(
                    decoration: BoxDecoration(
                        border: Border(
                            top: BorderSide(
                                color: Theme.of(context).dividerColor,
                                width: 1))),
                    child: BottomNavigationBar(
                      currentIndex: selectedTap,
                      onTap: (idx) async {
                        _webviewRepository.loadRootUrl(idx);

                        if (idx != selectedTap) {
                          setState(() {
                            // 탭 인덱스가 변했던 기록을 스택에 쌓음
                            tapIndexStack.add(selectedTap);
                            selectedTap = idx;
                          });
                        }
                      },
                      items: const <BottomNavigationBarItem>[
                        BottomNavigationBarItem(
                          icon: Icon(Icons.home),
                          label: 'Home',
                        ),
                        BottomNavigationBarItem(
                          icon: Icon(Icons.sports_golf),
                          label: 'Swing',
                        ),
                        BottomNavigationBarItem(
                          icon: Icon(Icons.more_horiz),
                          label: 'More',
                        ),
                      ],
                    ),
                  )
                : null,
          ),
          onWillPop: () async {
            if (await _webviewRepository.canGoBack) {
              _webviewRepository.goBack();

              return Future.value(false);
            }

            return Future.value(true);
          },
        );
      },
    );
  }
}
