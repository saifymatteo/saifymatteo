import 'package:flutter/material.dart';
import 'package:flutter_web/flutter_web.dart';

class PortfolioMainAppBar extends StatelessWidget {
  const PortfolioMainAppBar({
    required this.main,
    this.actions,
    this.color = Colors.lightBlue,
    this.height = kTextTabBarHeight,
    super.key,
  });

  final double height;
  final Color color;
  final PortfolioMainAppBarButtonOption main;
  final List<PortfolioMainAppBarButtonOption>? actions;

  @override
  Widget build(BuildContext context) {
    final horizontalPadding = height / 2.5;

    return SizedBox(
      height: height,
      child: Material(
        color: color,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            InkWell(
              onTap: main.onTap,
              child: Container(
                alignment: Alignment.center,
                padding: main.padding ??
                    EdgeInsets.symmetric(horizontal: horizontalPadding),
                child: main.child,
              ),
            ),
            if (!actions.isNullOrEmpty)
              Row(
                children: [
                  for (final i in actions!)
                    InkWell(
                      onTap: i.onTap,
                      child: Container(
                        alignment: Alignment.center,
                        padding: i.padding ??
                            EdgeInsets.symmetric(horizontal: horizontalPadding),
                        child: i.child,
                      ),
                    ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}

class PortfolioMainAppBarButtonOption {
  const PortfolioMainAppBarButtonOption({
    required this.onTap,
    required this.child,
    this.padding,
  });

  final VoidCallback onTap;
  final Widget child;
  final EdgeInsets? padding;
}
