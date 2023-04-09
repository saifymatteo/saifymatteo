import 'package:components/components.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/routes/routes.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class FlutterPortfolio extends HookConsumerWidget {
  const FlutterPortfolio({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      routerConfig: router.config(
        navigatorObservers: () => [ComBasicAutoRouteObserver()],
      ),
      scrollBehavior: const ComScrollBehavior(),
    );
  }
}
