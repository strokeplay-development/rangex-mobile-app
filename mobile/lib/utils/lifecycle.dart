import 'package:flutter/material.dart';

class LifeCycle {
  static void onWidgetDidBuild(Function callback) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      callback();
    });
  }
}
