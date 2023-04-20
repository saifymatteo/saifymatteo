import 'package:auto_route/auto_route.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_web/routes/routes.dart';

export 'routes.gr.dart';

final routerProvider = Provider((ref) => PortfolioRouter());

@AutoRouterConfig()
class PortfolioRouter extends $PortfolioRouter {
  @override
  final List<AutoRoute> routes = [
    CustomRoute(
      page: PortfolioShellRoute.page,
      path: '/',
      initial: true,
      children: [
        CustomRoute(
          page: PortfolioHomeRoute.page,
          path: 'index',
          initial: true,
        ),
        CustomRoute(
          page: PortfolioAboutRoute.page,
          path: 'about',
        ),
      ],
    ),
  ];
}
