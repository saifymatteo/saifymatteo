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
      child: Text.rich(
        TextSpan(
          children: [
            TextSpan(text: l10n.copyrightNotice),
            const TextSpan(text: ' '),
            TextSpan(text: l10n.madeWithFlutter),
            const TextSpan(text: ' '),
            WidgetSpan(
              alignment: PlaceholderAlignment.middle,
              child: Icon(Icons.favorite, color: Colors.red, size: 16),
            ),
          ],
        ),
      ),
    );
  }
}
