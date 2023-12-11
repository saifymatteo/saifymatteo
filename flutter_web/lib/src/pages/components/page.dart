import 'package:flutter/material.dart';
import 'package:universal_html/html.dart' as html;

import '../../../lib.dart';
import 'components.dart';

class BasePage extends StatelessWidget {
  const BasePage({super.key, required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: RefreshIndicator.adaptive(
        onRefresh: () async {
          html.window.location.reload();
        },
        child: CustomScrollView(
          shrinkWrap: true,
          slivers: [
            const SliverAppBar(
              collapsedHeight: 80,
              floating: true,
              backgroundColor: AppTheme.black,
              elevation: 2,
              forceElevated: true,
              flexibleSpace: MenuAppBar(),
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
