import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/url_strategy.dart';

import 'src/app.dart';

void main() async {
  usePathUrlStrategy();
  runApp(const MyApp());
}
