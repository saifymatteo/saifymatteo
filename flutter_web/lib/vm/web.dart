import 'package:flutter_web_plugins/url_strategy.dart' as web_plugin;
import 'package:web/web.dart' as web;

void usePathUrlStrategy() {
  web_plugin.usePathUrlStrategy();
}

void reloadPage() {
  web.window.location.reload();
}
