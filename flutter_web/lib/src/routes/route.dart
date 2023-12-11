import 'package:auto_route/auto_route.dart';

import 'route.gr.dart';

@AutoRouterConfig(
  replaceInRouteName: '',
  deferredLoading: true,
)
class AppRouter extends $AppRouter {
  @override
  List<AutoRoute> get routes => [
        AutoRoute(
          page: HomePageRoute.page,
          path: '/',
          initial: true,
        ),
        AutoRoute(
          page: PortfolioPageRoute.page,
          path: '/portfolio/:title',
        ),
      ];
}
