import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

final darkTheme = ThemeData(
  brightness: Brightness.dark,
  cardColor: const Color(0xff143859),
  highlightColor: const Color(0xff417BB1),
  disabledColor: const Color(0xff838B93),
  dividerColor: const Color(0xff2A3947),
  scaffoldBackgroundColor: const Color(0xff04182B),
  appBarTheme: const AppBarTheme(
    systemOverlayStyle: SystemUiOverlayStyle.dark,
    backgroundColor: Color(0xff04182B),
  ),
  bottomNavigationBarTheme: const BottomNavigationBarThemeData(
    backgroundColor: Color(0xff04182B),
    unselectedItemColor: Color(0xff838B93),
    selectedItemColor: Color(0xffffffff),
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      primary: const Color(0xff143859),
    ),
  ),
);

class NoScalingFABAnimation extends FloatingActionButtonAnimator {
  double? _x;
  double? _y;
  @override
  Offset getOffset({Offset? begin, Offset? end, double? progress}) {
    _x = begin!.dx + (end!.dx - begin.dx) * progress!;
    _y = begin.dy + (end.dy - begin.dy) * progress;
    return Offset(_x!, _y!);
  }

  @override
  Animation<double> getRotationAnimation({Animation<double>? parent}) {
    return Tween<double>(begin: 1.0, end: 1.0).animate(parent!);
  }

  @override
  Animation<double> getScaleAnimation({Animation<double>? parent}) {
    return Tween<double>(begin: 1, end: 1).animate(parent!);
  }
}
