import 'package:auto_route/auto_route.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../lib.dart';
import '../components/components.dart';

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

class _MeSection extends StatelessWidget {
  const _MeSection({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;
    final maxConstraints = MediaQuery.sizeOf(context).width < 920;
    final overlyMaxConstraints = MediaQuery.sizeOf(context).width < 760;

    return WebBodyBase(
      padding: EdgeInsets.zero,
      child: Stack(
        children: [
          Positioned(
            left: 0,
            top: 0,
            bottom: 0,
            child: AnimatedContainer(
              duration: 300.milliseconds,
              curve: Curves.fastEaseInToSlowEaseOut,
              padding: EdgeInsets.only(left: 20, top: maxConstraints ? 60 : 0),
              alignment:
                  maxConstraints ? Alignment.topCenter : Alignment.center,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Flexible(
                    child: Text(
                      l10n.heyThere,
                      style: Theme.of(context).textTheme.displaySmall,
                    ),
                  ),
                  Flexible(
                    child: Text(
                      l10n.imSaifulMashuri,
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                  ),
                  Flexible(
                    child: Text(
                      l10n.aSoftwareDeveloper,
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                  ),
                  Flexible(
                    child: Text(
                      l10n.iCanMakeApps,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: AnimatedPadding(
              duration: 300.milliseconds,
              curve: Curves.fastEaseInToSlowEaseOut,
              padding: EdgeInsets.only(top: overlyMaxConstraints ? 220 : 0),
              child: AppAssets.images.meMaskable.image(
                  height: 498,
                  alignment: Alignment.bottomCenter,
                  fit: BoxFit.cover),
            ),
          ),
        ],
      ),
    );
  }
}

class _AboutSection extends StatelessWidget {
  const _AboutSection({super.key, this.onTapSeeWhatIDo});

  final VoidCallback? onTapSeeWhatIDo;

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;
    final isMobile = MediaQuery.sizeOf(context).width < C.media.medium;

    return WebBodyBase(
      decoration: const BoxDecoration(
        color: AppTheme.black,
      ),
      children: [
        Padding(
          padding: EdgeInsets.only(right: isMobile ? 0 : 192),
          child: Text(
            l10n.aboutMe,
            textAlign: isMobile ? TextAlign.center : TextAlign.right,
            style: Theme.of(context).textTheme.displaySmall?.copyWith(
                  color: Colors.white,
                ),
          ),
        ),
        const SizedBox(height: 34),
        Text.rich(
          TextSpan(
            children: [
              TextSpan(
                text: l10n.cs50x,
                style: const TextStyle(decoration: TextDecoration.underline),
                recognizer: TapGestureRecognizer()
                  ..onTap = () => launchUrl(C.url.cs50xAddress),
              ),
              const TextSpan(text: ' '),
              TextSpan(text: l10n.aboutMeDescription),
            ],
          ),
          textAlign: TextAlign.center,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white,
                height: 2,
              ),
        ),
        const SizedBox(height: 84),
        Center(
          child: InkWell(
            onTap: onTapSeeWhatIDo,
            child: Column(
              children: [
                Text(
                  l10n.seeWhatIDo,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        color: Colors.white,
                      ),
                ),
                Animate(
                  effects: [
                    MoveEffect(
                      begin: const Offset(0, 0),
                      end: const Offset(0, 10),
                      duration: 500.milliseconds,
                      curve: Curves.fastEaseInToSlowEaseOut,
                    ),
                  ],
                  autoPlay: true,
                  onPlay: (controller) => controller.repeat(reverse: true),
                  child: const Icon(
                    Icons.arrow_drop_down,
                    color: Colors.white,
                    size: 40,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _PortfolioSection extends StatelessWidget {
  const _PortfolioSection({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      children: [
        TitleText(text: l10n.myWorks),
        GridView(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 1,
            mainAxisExtent: 200,
          ),
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 40),
              child: Text(
                'Under construction 🚧',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _ContactSection extends StatelessWidget {
  const _ContactSection({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      decoration: const BoxDecoration(
        color: AppTheme.black,
      ),
      children: [
        TitleText(
          text: l10n.contactMe,
          color: Colors.white,
        ),
        const SizedBox(height: 30),
        BodyText(
          text: l10n.contactMeDescription,
          color: Colors.white,
        ),
        const SizedBox(height: 60),
        Wrap(
          spacing: 60,
          runSpacing: 30,
          alignment: WrapAlignment.center,
          children: [
            _Button(
              label: l10n.resume,
              onTap: () => launchUrl(C.url.resumeAddress),
            ),
            _Button(
              label: l10n.email,
              onTap: () => launchUrl(C.url.emailAddress),
            ),
            _Button(
              label: l10n.whatsApp,
              onTap: () => launchUrl(C.url.whatsAppAddress),
            ),
          ],
        ),
      ],
    );
  }
}

class _Button extends StatefulWidget {
  const _Button({required this.label, this.onTap});

  final String label;
  final VoidCallback? onTap;

  @override
  State<_Button> createState() => _ButtonState();
}

class _ButtonState extends State<_Button> {
  bool _isHover = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: widget.onTap,
      onHover: (value) => setState(() => _isHover = value),
      child: AnimatedContainer(
        duration: 300.milliseconds,
        curve: Curves.fastEaseInToSlowEaseOut,
        width: 188,
        padding: const EdgeInsets.symmetric(vertical: 18),
        decoration: BoxDecoration(
          color: _isHover ? AppTheme.grey : Colors.white,
          borderRadius: BorderRadius.circular(50),
        ),
        child: Animate(
          effects: [
            ScaleEffect(
              begin: const Offset(1, 1),
              end: const Offset(1.1, 1.1),
              duration: 500.milliseconds,
              curve: Curves.fastEaseInToSlowEaseOut,
            ),
          ],
          target: _isHover ? 1 : 0,
          child: Text(
            widget.label,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: _isHover ? Colors.white : AppTheme.grey,
                ),
          ),
        ),
      ),
    );
  }
}
