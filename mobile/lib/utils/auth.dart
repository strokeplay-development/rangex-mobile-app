import 'dart:math';

class AuthUtils {
  static String getRandomString(int length) {
    const _chars =
        'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    Random _rnd = Random();
    return String.fromCharCodes(Iterable.generate(
        length, (_) => _chars.codeUnitAt(_rnd.nextInt(_chars.length))));
  }

  static String jsStringSetCookie(String name, String? value) {
    return 'document.cookie = "$name=$value;"';
  }

  static Map<String, String>? getCookies(String cookieString) {
    final mapped = <String, String>{};

    final cookies = cookieString.split('; ');
    for (var element in cookies) {
      final cookie = element.split('=');

      mapped[cookie[0]] = cookie[1];
    }

    return mapped;
  }
}
