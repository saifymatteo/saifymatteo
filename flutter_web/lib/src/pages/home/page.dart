import 'package:auto_route/auto_route.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../lib.dart';
import '../components/components.dart';

part 'sections/about.dart';
part 'sections/contact.dart';
part 'sections/portfolio.dart';
part 'sections/me.dart';

@RoutePage()
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final Map<HomeSections, GlobalKey> _scrollKeys = {
    HomeSections.me: GlobalKey(debugLabel: 'me'),
    HomeSections.about: GlobalKey(debugLabel: 'about'),
    HomeSections.portfolio: GlobalKey(debugLabel: 'portfolio'),
    HomeSections.contact: GlobalKey(debugLabel: 'contact'),
  };

  @override
  Widget build(BuildContext context) {
    return BasePage(
      scrollKeys: _scrollKeys,
      body: ListView(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        children: [
          _MeSection(key: _scrollKeys[HomeSections.me]),
          _AboutSection(
            key: _scrollKeys[HomeSections.about],
            onTapSeeWhatIDo: () {
              if (_scrollKeys[HomeSections.portfolio]?.currentContext != null) {
                Scrollable.ensureVisible(
                  _scrollKeys[HomeSections.portfolio]!.currentContext!,
                  duration: const Duration(milliseconds: 500),
                  curve: Curves.fastEaseInToSlowEaseOut,
                );
              }
            },
          ),
          _PortfolioSection(key: _scrollKeys[HomeSections.portfolio]),
          _ContactSection(key: _scrollKeys[HomeSections.contact]),
        ],
      ),
    );
  }
}
