import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/ui/components/components.dart';
import 'package:flutter_web/ui/pages/work/state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final _stateProvider = Provider.autoDispose((ref) {
  final state = PortfolioWorkState();
  return state;
});

@RoutePage()
class PortfolioWorkScreen extends HookConsumerWidget {
  const PortfolioWorkScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(_stateProvider);

    return const PortfolioMainBodyBase(
      body: Text('Work'),
    );
  }
}
