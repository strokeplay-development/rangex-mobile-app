import 'dart:convert';
import 'dart:io';
import 'package:auto_route/auto_route.dart';
import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:gallery_saver/gallery_saver.dart';
import 'package:image_picker/image_picker.dart';
import 'package:rangex/api/media.dart';
import 'package:rangex/authentication/repositories/auth_repository.dart';
import 'package:rangex/authentication/repositories/user_repository.dart';
import 'package:rangex/routes/app_router.gr.dart';
import 'package:rangex/utils/javascript.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http_parser/http_parser.dart';

typedef UrlChangeHandler = void Function(String url);
typedef ModalStateChangeHandler = void Function(bool isOpen, [String? url]);

class WebviewRepository {
  WebviewRepository({required String baseUrl}) : _baseUrl = baseUrl {
    rootUrls = [
      '$_baseUrl/home',
      '$_baseUrl/swings',
      '$_baseUrl/more',
    ];
  }

  final String _baseUrl;
  final cookieManager = CookieManager();

  late WebViewController _controller;

  List<String> rootUrls = [];

  final List<String> rootPaths = ['/home', '/swings', '/more'];

  /// 웹뷰 위젯 생성하기
  WebView getWebviewWidget({
    required BuildContext context,
    Function? onCreated,
    UrlChangeHandler? onUrlChanged,
    ModalStateChangeHandler? onModalStateChanged,
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
      allowsInlineMediaPlayback: true,
      initialMediaPlaybackPolicy: AutoMediaPlaybackPolicy.always_allow,

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
        final mappedCookie = JavascriptHelper.cookieStringToMap(webCookies);

        String? accessToken = mappedCookie?['accessToken'];
        String? refreshToken = mappedCookie?['refreshToken'];

        final authRepo = RepositoryProvider.of<AuthRepository>(context);

        String? newAccessToken = await authRepo.accessToken;
        String? newRefreshToken = await authRepo.refreshToken;

        /// 새 액세스 토큰 셋팅
        if (accessToken == null ||
            accessToken == '' ||
            accessToken != newAccessToken) {
          final setAccess = JavascriptHelper.setCookieString(
            'accessToken',
            newAccessToken,
          );
          _controller.runJavascript(setAccess);

          print('새 엑세스 토큰 셋팅');
        }

        /// 새 리프레쉬 토큰 셋팅
        if (refreshToken == null ||
            refreshToken == '' ||
            refreshToken != newRefreshToken) {
          final setRefresh = JavascriptHelper.setCookieString(
            'refreshToken',
            newRefreshToken,
          );
          _controller.runJavascript(setRefresh);

          print('새 리프레쉬 토큰 셋팅');
        }

        /// 웹뷰 언어 셋팅
        final sp = await SharedPreferences.getInstance();
        final appLang = sp.getString('locale');

        String? lang = mappedCookie?['lang'];

        if (appLang != lang) {
          final setLang = JavascriptHelper.setCookieString('lang', appLang);
          await _controller.runJavascript(setLang);
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

        /// 페이지 주소 변경 시
        JavascriptChannel(
          name: 'LocationChanged',
          onMessageReceived: (message) {
            print('[Current Path] ${message.message}');
            if (onUrlChanged != null) {
              onUrlChanged(message.message);
            }
          },
        ),

        /// 로그아웃 요청이 오면
        JavascriptChannel(
          name: 'LogoutRequested',
          onMessageReceived: (message) async {
            // 웹뷰 캐시 비기
            await _controller.clearCache();
            await cookieManager.clearCookies();

            final webCookies = await _controller
                .runJavascriptReturningResult('document.cookie');

            print('쿠키있냐 $webCookies');

            // 앱 토큰 삭제
            await RepositoryProvider.of<AuthRepository>(context).logOut();

            context.router.popUntil((route) => false);
            context.router.pushNamed('/welcome');
          },
        ),

        /// 가입요청이 오면
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

        /// 회원정보 수정 요청이 오면
        JavascriptChannel(
          name: 'ModifyUserRequested',
          onMessageReceived: (message) async {
            await RepositoryProvider.of<UserRepository>(context)
                .modifyOptionals(jsonDecode(message.message));

            goBack();
          },
        ),

        /// 언어변경 요청이 오면
        JavascriptChannel(
          name: 'LanguageChangeRequested',
          onMessageReceived: (message) {
            final langForChange = message.message;

            if (langForChange == context.locale.languageCode) return;

            context.setLocale(Locale(langForChange));
            final setLang =
                JavascriptHelper.setCookieString('lang', langForChange);
            _controller.runJavascript(setLang);
          },
        ),

        JavascriptChannel(
          name: 'OpenFullScreenVideo',
          onMessageReceived: (message) {
            print(message.message);

            //context.router.pushNamed('/video');
          },
        ),

        /// 파일 다운로드
        JavascriptChannel(
          name: 'FileDownloadRequested',
          onMessageReceived: (message) async {
            try {
              await GallerySaver.saveVideo(message.message);

              print('Video is saved.');
            } catch (error) {
              print(error);
            }
          },
        ),

        /// 카메라 열기
        JavascriptChannel(
          name: 'OpenCameraRequested',
          onMessageReceived: (_) async {
            print('갤러리 켜기');
            final ImagePicker picker = ImagePicker();
            try {
              final XFile? image =
                  await picker.pickImage(source: ImageSource.gallery);

              if (image != null) {
                final imageFile = MultipartFile.fromFileSync(
                  File(image.path).path,
                  contentType: MediaType(
                    'image',
                    'jpg',
                  ),
                );

                final formDataImage = FormData.fromMap(
                  {"profileImg": imageFile},
                );

                final res = await MediaHttp().modifyAvatar(formDataImage);

                if (res.statusCode == 200) {
                  print(res.data);
                }
              }
            } catch (e) {
              Exception(e);
            }
          },
        ),

        /// 외부페이지 요청이 오면
        JavascriptChannel(
          name: 'ThirdPartyPageRequested',
          onMessageReceived: (message) {
            context.router.push(
              ThirdPartyRouter(url: dotenv.env[message.message]!),
            );
          },
        ),

        /// 웹뷰에서 모달 상태가 변경되면
        JavascriptChannel(
          name: 'ModalStateChanged',
          onMessageReceived: (message) async {
            final bool modalState = jsonDecode(message.message) as bool;
            final curUrl =
                modalState == false ? await _controller.currentUrl() : null;

            onModalStateChanged!(modalState, curUrl);
          },
        ),

        JavascriptChannel(
          name: 'ErrorCatched',
          onMessageReceived: (message) {
            print(message.message);
          },
        ),
      },
    );
  }

  /// Controller

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
