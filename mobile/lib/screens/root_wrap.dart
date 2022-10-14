import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/screens/feed/views/feed_appbar.dart';
import 'package:rangex/screens/more/views/more_appbar.dart';
import 'package:rangex/screens/swing/views/swings_appbar.dart';
import 'package:rangex/webview/webview_bloc.dart';
import 'package:rangex/webview/webview_event.dart';
import 'package:rangex/webview/webview_repository.dart';
import 'package:rangex/webview/webview_state.dart';
import 'package:webview_flutter/webview_flutter.dart';

class RootWrap extends StatefulWidget {
  const RootWrap({Key? key}) : super(key: key);

  @override
  State<RootWrap> createState() => _RootWrapState();
}

class _RootWrapState extends State<RootWrap> {
  final _webviewRepository = WebviewRepository(
    baseUrl: dotenv.env['WEBVIEW_BASE_URL']!,
  );
  late WebviewBloc? _webviewBloc;
  late AuthRepository _authRepo;

  List<WebViewCookie> _cookies = const [];

  int selectedTap = 0;
  List<int> tapIndexStack = [];
  double statusBarHeight = 0;

  List<Function> appbarBuilder = [
    buildFeedAppbar,
    buildSwingAppbar,
    buildMoreAppbar,
  ];

  @override
  void initState() {
    _webviewBloc = WebviewBloc(webviewRepository: _webviewRepository);
    _authRepo = RepositoryProvider.of<AuthRepository>(context);
    print("웹뷰 위젯 스테이트 시작");

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<WebviewBloc, WebviewState>(
      bloc: _webviewBloc,
      builder: (context, state) {
        print('[WEBVIEW] state: $state');

        if (state is WebviewStateNotLoaded) {
          readyWebviewCreate();
          return Container();
        }

        statusBarHeight =
            state is WebviewStateDeep ? MediaQuery.of(context).padding.top : 0;

        return WillPopScope(
          child: Scaffold(
            appBar: state is WebviewStateRoot
                ? appbarBuilder[selectedTap](context)
                : null,
            body: Padding(
              padding: EdgeInsets.only(top: statusBarHeight),
              child: Stack(children: [
                _webviewRepository.getWebviewWidget(
                  context: context,
                  onUrlChanged: (changedUrl) {
                    _webviewBloc?.add(WebviewUrlChanged(changedUrl));
                  },
                  onModalStateChanged: (isOpen, [url]) {
                    print('모달바꺼죠! $isOpen');
                    if (isOpen) {
                      return _webviewBloc?.add(WebviewModalOpened());
                    }

                    _webviewBloc?.add(WebviewUrlChanged(url));
                  },
                  cookies: _cookies,
                ),

                /// FAB 뒤로가기
                Visibility(
                  visible: state is! WebviewStateRoot,
                  child: Positioned(
                    top: 4,
                    left: 6,
                    child: IconButton(
                      icon: Opacity(
                        opacity: state is WebviewStateModal ? 0.5 : 1,
                        child: const Icon(
                          Icons.arrow_back,
                          color: Colors.white,
                        ),
                      ),
                      onPressed: () async {
                        if (await _webviewRepository.canGoBack) {
                          if (state is WebviewStateModal) {
                            print('모달이 켜져 있습니다.');
                            return;
                          }

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
                      items: <BottomNavigationBarItem>[
                        BottomNavigationBarItem(
                          icon: const Icon(Icons.home),
                          label: tr('navi_home'),
                        ),
                        BottomNavigationBarItem(
                          icon: const Icon(Icons.sports_golf),
                          label: tr('navi_swings'),
                        ),
                        BottomNavigationBarItem(
                          icon: const Icon(Icons.more_horiz),
                          label: tr('navi_more'),
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

  /// 토큰을 쿠키로 만들기
  List<WebViewCookie> bakeTokens(String? access, String? refresh) {
    final tokens = <WebViewCookie>[];

    if (access != null) {
      tokens.add(
        WebViewCookie(
          name: 'accessToken',
          value: access,
          domain: dotenv.env['WEBVIEW_BASE_URL']!,
        ),
      );
    }

    if (refresh != null) {
      tokens.add(
        WebViewCookie(
          name: 'refreshToken',
          value: refresh,
          domain: dotenv.env['WEBVIEW_BASE_URL']!,
        ),
      );
    }

    print('TOKEN COOKIES: $tokens');

    return tokens;
  }

  /// 웹뷰 생성 준비하기
  Future<void> readyWebviewCreate() async {
    _cookies = bakeTokens(
      await _authRepo.accessToken,
      await _authRepo.refreshToken,
    );

    _webviewBloc?.add(WebviewCreateReady());
  }
}
