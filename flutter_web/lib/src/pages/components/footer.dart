import 'package:flutter/material.dart';

import '../../../lib.dart';
import 'components.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      padding: const EdgeInsets.symmetric(vertical: 30),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            l10n.madeWithFlutter,
            style: Theme.of(context).textTheme.titleMedium,
          ),
          Icon(Icons.favorite, color: Colors.red),
        ],
      ),
    );
  }
}
