import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_web/ui/components/components.dart';
import 'package:flutter_web/ui/pages/home/state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final _stateProvider = Provider((ref) => PortfolioHomeState());

@RoutePage()
class PortfolioHomeScreen extends HookConsumerWidget {
  const PortfolioHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(_stateProvider);

    useMemoized<void>(
      state.setAndStreamCounter,
      [state.name.value],
    );

    return PortfolioMainBodyBase(
      body: StreamBuilder(
        stream: state.stream,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Text(snapshot.error.toString());
          }

          if (!snapshot.hasData) {
            return const Text('no data');
          }

          return Column(
            children: [
              Text(snapshot.data!.name),
              for (final i in snapshot.data!.counter) Text(i),
            ],
          );
        },
      ),
    );
  }
}
