import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../lib.dart';
import '../components/components.dart';
import '../portfolio/page.dart';

part 'sections/about.dart';
part 'sections/contact.dart';
part 'sections/portfolio.dart';
part 'sections/me.dart';

@RoutePage()
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, state, _) {
        return BasePage(
          children: [
            _MeSection(
              onBuildWidget: (value) =>
                  state.updateScrollContext(HomeSections.me, value),
            ),
            _AboutSection(
              onBuildWidget: (value) =>
                  state.updateScrollContext(HomeSections.about, value),
              onTapSeeWhatIDo: () {
                if (state.scrollContext[HomeSections.portfolio] != null) {
                  Scrollable.ensureVisible(
                    state.scrollContext[HomeSections.portfolio]!,
                    duration: const Duration(milliseconds: 500),
                    curve: Curves.fastEaseInToSlowEaseOut,
                  );
                }
              },
            ),
            _PortfolioSection(
              onBuildWidget: (value) =>
                  state.updateScrollContext(HomeSections.portfolio, value),
            ),
            _ContactSection(
              onBuildWidget: (value) =>
                  state.updateScrollContext(HomeSections.contact, value),
            ),
          ],
        );
      },
    );
  }
}
