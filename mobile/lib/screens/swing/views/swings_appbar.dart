import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

PreferredSizeWidget buildSwingAppbar(BuildContext context) {
  return AppBar(
    title: Text(tr('navi_swings')),
    centerTitle: false,
    elevation: 0,
    systemOverlayStyle: SystemUiOverlayStyle.light,
  );
}
