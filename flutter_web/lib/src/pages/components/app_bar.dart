import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../../../lib.dart';
import 'components.dart';

class MenuAppBar extends StatelessWidget {
  const MenuAppBar({super.key, required this.onTapNavigation});

  final ValueChanged<HomeSections> onTapNavigation;

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
              onTap: () => _onTapToScroll(
                context: context,
                section: HomeSections.me,
              ),
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
                    context: context,
                    section: HomeSections.portfolio,
                  ),
                ),
                _ActionButton(
                  labelText: l10n.contact,
                  onPressed: () => _onTapToScroll(
                    context: context,
                    section: HomeSections.contact,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _onTapToScroll({
    required BuildContext context,
    required HomeSections section,
  }) async {
    await context.router.navigate(const HomePageRoute());

    onTapNavigation.call(section);
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
