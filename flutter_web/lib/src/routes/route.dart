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
          page: BasePageRoute.page,
          initial: true,
          children: [
            AutoRoute(
              page: HomePageRoute.page,
              initial: true,
            ),
          ],
        ),
      ];
}
