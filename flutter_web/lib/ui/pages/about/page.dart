import 'package:auto_route/auto_route.dart';
import 'package:extensions/extensions.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/ui/components/components.dart';
import 'package:flutter_web/ui/pages/about/state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final _stateProvider = Provider((ref) => PortfolioAboutState());

@RoutePage()
class PortfolioAboutScreen extends HookConsumerWidget {
  const PortfolioAboutScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(_stateProvider);

    return PortfolioMainBodyBase(
      body: StreamBuilder(
        stream: state.stream,
        builder: (context, snapshot) {
          if (snapshot.hasError || !snapshot.hasData) {
            return const CircularProgressIndicator();
          }
          return Column(
            children: [
              Text(snapshot.data!.name),
              Text(snapshot.data!.counter.numberFormat),
              TextButton(
                onPressed: () => state.counter.value++,
                child: const Text('increase'),
              ),
              TextButton(
                onPressed: () => state.counter.value--,
                child: const Text('decrease'),
              ),
              TextField(
                onChanged: (value) => state.name.value = value,
              ),
            ],
          );
        },
      ),
    );
  }
}
