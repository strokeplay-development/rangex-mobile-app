import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:mobile/routes/app_router.gr.dart';

class RootWrap extends StatefulWidget {
  const RootWrap({Key? key}) : super(key: key);

  @override
  State<RootWrap> createState() => _RootWrapState();
}

class _RootWrapState extends State<RootWrap> {
  @override
  Widget build(BuildContext context) {
    return AutoTabsScaffold(
      routes: const [
        FeedRouter(),
        SwingRouter(),
        MoreRouter(),
      ],
      appBarBuilder: (_, __) => AppBar(title: const Text('루트다')),
      // body: AutoRouter(),
      bottomNavigationBuilder: (_, tabsRouter) => BottomNavigationBar(
        currentIndex: tabsRouter.activeIndex,
        onTap: tabsRouter.setActiveIndex,
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
    );
  }
}
