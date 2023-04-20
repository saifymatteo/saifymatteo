// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouterGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:auto_route/auto_route.dart' as _i4;
import 'package:flutter_web/ui/pages/about/page.dart' as _i1;
import 'package:flutter_web/ui/pages/home/page.dart' as _i2;
import 'package:flutter_web/ui/shell.dart' as _i3;

abstract class $PortfolioRouter extends _i4.RootStackRouter {
  $PortfolioRouter({super.navigatorKey});

  @override
  final Map<String, _i4.PageFactory> pagesMap = {
    PortfolioAboutRoute.name: (routeData) {
      return _i4.AutoRoutePage<dynamic>(
        routeData: routeData,
        child: const _i1.PortfolioAboutScreen(),
      );
    },
    PortfolioHomeRoute.name: (routeData) {
      return _i4.AutoRoutePage<dynamic>(
        routeData: routeData,
        child: const _i2.PortfolioHomeScreen(),
      );
    },
    PortfolioShellRoute.name: (routeData) {
      return _i4.AutoRoutePage<dynamic>(
        routeData: routeData,
        child: const _i3.PortfolioShellScreen(),
      );
    },
  };
}

/// generated route for
/// [_i1.PortfolioAboutScreen]
class PortfolioAboutRoute extends _i4.PageRouteInfo<void> {
  const PortfolioAboutRoute({List<_i4.PageRouteInfo>? children})
      : super(
          PortfolioAboutRoute.name,
          initialChildren: children,
        );

  static const String name = 'PortfolioAboutRoute';

  static const _i4.PageInfo<void> page = _i4.PageInfo<void>(name);
}

/// generated route for
/// [_i2.PortfolioHomeScreen]
class PortfolioHomeRoute extends _i4.PageRouteInfo<void> {
  const PortfolioHomeRoute({List<_i4.PageRouteInfo>? children})
      : super(
          PortfolioHomeRoute.name,
          initialChildren: children,
        );

  static const String name = 'PortfolioHomeRoute';

  static const _i4.PageInfo<void> page = _i4.PageInfo<void>(name);
}

/// generated route for
/// [_i3.PortfolioShellScreen]
class PortfolioShellRoute extends _i4.PageRouteInfo<void> {
  const PortfolioShellRoute({List<_i4.PageRouteInfo>? children})
      : super(
          PortfolioShellRoute.name,
          initialChildren: children,
        );

  static const String name = 'PortfolioShellRoute';

  static const _i4.PageInfo<void> page = _i4.PageInfo<void>(name);
}
