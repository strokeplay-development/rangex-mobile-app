class JavascriptHelper {
  /// 쿠키생성 자바스크립트 코드
  static String setCookieString(String cookieName, String? value) {
    return 'document.cookie = "$cookieName=${value ?? ''};"';
  }

  /// 쿠키문자열을 맵 형식으로 변환
  static Map<String, String>? cookieStringToMap(String? cookieString) {
    final mapped = <String, String>{};

    if (cookieString != null) {
      final cookies = cookieString.split('; ');

      if (cookies.isNotEmpty) {
        for (var element in cookies) {
          final cookie = element.split('=');

          if (cookie.length > 1) {
            mapped[cookie[0]] = cookie[1] == 'null' ? '' : cookie[1];
          }
        }
      }
    }

    return mapped;
  }
}
