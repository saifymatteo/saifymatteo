import 'package:flutter/material.dart';
import 'package:url_strategy/url_strategy.dart';

import 'src/app.dart';

void main() async {
  setPathUrlStrategy();
  runApp(const MyApp());
}
