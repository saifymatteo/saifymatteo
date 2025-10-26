import 'package:flutter/material.dart';

import '../../../lib.dart';

class TitleText extends StatelessWidget {
  const TitleText({
    super.key,
    required this.text,
    this.color = AppTheme.black,
  });

  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: TextAlign.center,
      style: Theme.of(context).textTheme.displaySmall?.copyWith(color: color),
    );
  }
}

class BodyText extends StatelessWidget {
  const BodyText({
    super.key,
    required this.text,
    this.color = AppTheme.black,
  });

  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: TextAlign.center,
      style: Theme.of(context).textTheme.titleMedium?.copyWith(
            color: color,
            height: 2,
          ),
    );
  }
}
