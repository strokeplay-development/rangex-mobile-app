import 'package:flutter/material.dart';

final darkTheme = ThemeData(
  brightness: Brightness.dark,
  dividerColor: const Color(0xff2A3947),
  scaffoldBackgroundColor: const Color(0xff04182B),
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xff04182B),
  ),
  bottomNavigationBarTheme: const BottomNavigationBarThemeData(
    backgroundColor: Color(0xff04182B),
    unselectedItemColor: Color(0xff838B93),
    selectedItemColor: Color(0xffffffff),
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
