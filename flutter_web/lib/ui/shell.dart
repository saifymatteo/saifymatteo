import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web/flutter_web.dart';
import 'package:flutter_web/ui/components/components.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

@RoutePage()
class PortfolioShellScreen extends HookConsumerWidget {
  const PortfolioShellScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return Scaffold(
      body: CustomScrollView(
        primary: true,
        slivers: [
          SliverToBoxAdapter(
            child: PortfolioMainAppBar(
              main: PortfolioMainAppBarButtonOption(
                onTap: () => router.replaceAll([const PortfolioHomeRoute()]),
                child: const Text('saifymatteo'),
              ),
              actions: [
                PortfolioMainAppBarButtonOption(
                  onTap: () => router.replaceAll([const PortfolioAboutRoute()]),
                  child: const Text('About'),
                ),
              ],
            ),
          ),
          const SliverFillRemaining(child: AutoRouter()),
        ],
      ),
    );
  }
}
