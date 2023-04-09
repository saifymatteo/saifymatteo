import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/ui/components/components.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

@RoutePage()
class PortfolioAboutScreen extends HookConsumerWidget {
  const PortfolioAboutScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return PortfolioMainBodyBase(
      body: Column(
        children: const [
          Text('About'),
        ],
      ),
    );
  }
}
