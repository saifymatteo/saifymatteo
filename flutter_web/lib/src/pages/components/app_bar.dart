import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../../lib.dart';
import 'components.dart';

class MenuAppBar<T> extends StatelessWidget {
  const MenuAppBar({super.key, this.scrollKeys});

  final Map<T, GlobalKey<State<StatefulWidget>>>? scrollKeys;

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;
    final maxConstraints = MediaQuery.sizeOf(context).width < 660;

    return WebBodyBase(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: const BoxDecoration(color: AppTheme.black),
      child: Stack(
        children: [
          AnimatedContainer(
            duration: 300.milliseconds,
            curve: Curves.fastEaseInToSlowEaseOut,
            alignment: maxConstraints ? Alignment.centerLeft : Alignment.center,
            child: InkWell(
              onTap: () {
                if (context.router.canPop()) {
                  context.replaceRoute(const HomePageRoute());
                  return;
                }
                _onTapToScroll(scrollKeys?[HomeSections.me]?.currentContext);
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: AppAssets.icons.logoCircle.image(),
              ),
            ),
          ),
          Positioned(
            right: 0,
            top: 0,
            bottom: 0,
            child: Row(
              children: [
                _ActionButton(
                  labelText: l10n.portfolios,
                  onPressed: () => _onTapToScroll(
                    scrollKeys?[HomeSections.portfolio]?.currentContext,
                  ),
                ),
                _ActionButton(
                  labelText: l10n.contact,
                  onPressed: () => _onTapToScroll(
                    scrollKeys?[HomeSections.contact]?.currentContext,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _onTapToScroll(BuildContext? context) {
    if (context == null) {
      return;
    }

    Scrollable.ensureVisible(
      context,
      duration: const Duration(milliseconds: 500),
      curve: Curves.fastEaseInToSlowEaseOut,
    );
  }
}

class _ActionButton extends StatefulWidget {
  const _ActionButton({required this.labelText, this.onPressed});

  final VoidCallback? onPressed;
  final String labelText;

  @override
  State<_ActionButton> createState() => _ActionButtonState();
}

class _ActionButtonState extends State<_ActionButton> {
  bool _isHover = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: widget.onPressed,
      onHover: (value) => setState(() => _isHover = value),
      child: AnimatedContainer(
        duration: 300.milliseconds,
        curve: Curves.fastEaseInToSlowEaseOut,
        decoration: BoxDecoration(
          color: _isHover ? AppTheme.grey : AppTheme.black,
        ),
        alignment: Alignment.center,
        width: 140,
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
            widget.labelText,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Colors.white,
                  fontSize: 18,
                ),
          ),
        ),
      ),
    );
  }
}
