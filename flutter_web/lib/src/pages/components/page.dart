import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:provider/provider.dart';
import 'package:universal_html/html.dart' as html;

import '../../../lib.dart';
import 'components.dart';

class BasePage extends StatelessWidget {
  const BasePage({super.key, required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, state, __) {
        return Scaffold(
          backgroundColor: Colors.white,
          body: RefreshIndicator.adaptive(
            onRefresh: () async {
              html.window.location.reload();
            },
            child: CustomScrollView(
              shrinkWrap: true,
              slivers: [
                SliverAppBar(
                  collapsedHeight: 80,
                  floating: true,
                  backgroundColor: AppTheme.black,
                  elevation: 2,
                  forceElevated: true,
                  leading: const SizedBox(),
                  flexibleSpace: MenuAppBar(
                    onTapNavigation: (section) => _onTapNavigation(
                      context,
                      section: section,
                    ),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Column(
                    children: children,
                  ),
                ),
                const SliverToBoxAdapter(
                  child: Footer(),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _onTapNavigation(
    BuildContext context, {
    required HomeSections section,
  }) {
    SchedulerBinding.instance.addPostFrameCallback((_) {
      final state = context.read<AppState>();

      final keyContext = state.scrollContext[section];

      if (keyContext != null) {
        Scrollable.ensureVisible(
          keyContext,
          duration: const Duration(milliseconds: 500),
          curve: Curves.fastEaseInToSlowEaseOut,
        );
      }
    });
  }
}

class WebBodyBase extends StatelessWidget {
  const WebBodyBase({
    super.key,
    this.child,
    this.children,
    this.decoration,
    this.padding,
  });

  final Widget? child;
  final List<Widget>? children;
  final BoxDecoration? decoration;
  final EdgeInsets? padding;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: decoration,
      padding: padding ??
          const EdgeInsets.symmetric(
            vertical: 60,
            horizontal: 20,
          ),
      child: Align(
        alignment: Alignment.topCenter,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: kAppBodyWidth),
          child: _Base(child: child, children: children),
        ),
      ),
    );
  }
}

class _Base extends StatelessWidget {
  const _Base({this.child, this.children});

  final Widget? child;
  final List<Widget>? children;

  @override
  Widget build(BuildContext context) {
    assert(
      (child != null && children == null) ||
          (child == null && children != null),
      'At least one of child or children must be non-null',
    );

    if (child != null) {
      return child!;
    }

    if (children != null) {
      return ListView.builder(
        shrinkWrap: true,
        primary: false,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: children!.length,
        itemBuilder: (context, index) => children![index],
      );
    }

    return const SizedBox();
  }
}
