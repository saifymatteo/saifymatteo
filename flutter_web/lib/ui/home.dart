import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/ui/components/components.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

@RoutePage()
class PortfolioHomeScreen extends HookConsumerWidget {
  const PortfolioHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return PortfolioMainBodyBase(
      body: Column(
        children: [
          ...List.generate(
            100,
            (index) {
              return Container(
                decoration: const BoxDecoration(
                  color: Colors.black26,
                ),
                margin: const EdgeInsets.all(8),
                child: Text('$index'),
              );
            },
          ),
        ],
      ),
    );
  }
}
