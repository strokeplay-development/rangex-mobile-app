import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

PreferredSizeWidget buildFeedAppbar(BuildContext context) {
  return AppBar(
    title: SvgPicture.asset('assets/images/logo_white.svg'),
    centerTitle: false,
    elevation: 0,
  );
}
