// dart format width=80
// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouterGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:auto_route/auto_route.dart' as _i3;
import 'package:flutter/material.dart' as _i4;
import 'package:flutter_web/pages/home/page.dart' deferred as _i1;
import 'package:flutter_web/pages/portfolio/page.dart' deferred as _i2;

/// generated route for
/// [_i1.HomePage]
class HomePageRoute extends _i3.PageRouteInfo<void> {
  const HomePageRoute({List<_i3.PageRouteInfo>? children})
    : super(HomePageRoute.name, initialChildren: children);

  static const String name = 'HomePageRoute';

  static _i3.PageInfo page = _i3.PageInfo(
    name,
    builder: (data) {
      return _i3.DeferredWidget(_i1.loadLibrary, () => _i1.HomePage());
    },
  );
}

/// generated route for
/// [_i2.PortfolioPage]
class PortfolioPageRoute extends _i3.PageRouteInfo<PortfolioPageRouteArgs> {
  PortfolioPageRoute({
    _i4.Key? key,
    required String pathTitle,
    List<_i3.PageRouteInfo>? children,
  }) : super(
         PortfolioPageRoute.name,
         args: PortfolioPageRouteArgs(key: key, pathTitle: pathTitle),
         rawPathParams: {'title': pathTitle},
         initialChildren: children,
       );

  static const String name = 'PortfolioPageRoute';

  static _i3.PageInfo page = _i3.PageInfo(
    name,
    builder: (data) {
      final pathParams = data.inheritedPathParams;
      final args = data.argsAs<PortfolioPageRouteArgs>(
        orElse: () =>
            PortfolioPageRouteArgs(pathTitle: pathParams.getString('title')),
      );
      return _i3.DeferredWidget(
        _i2.loadLibrary,
        () => _i2.PortfolioPage(key: args.key, pathTitle: args.pathTitle),
      );
    },
  );
}

class PortfolioPageRouteArgs {
  const PortfolioPageRouteArgs({this.key, required this.pathTitle});

  final _i4.Key? key;

  final String pathTitle;

  @override
  String toString() {
    return 'PortfolioPageRouteArgs{key: $key, pathTitle: $pathTitle}';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other is! PortfolioPageRouteArgs) return false;
    return key == other.key && pathTitle == other.pathTitle;
  }

  @override
  int get hashCode => key.hashCode ^ pathTitle.hashCode;
}
