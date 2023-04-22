import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_web/app.dart';
import 'package:flutter_web/flutter_web.dart';

void main() {
  usePathUrlStrategy();

  runApp(
    const ProviderScope(
      observers: [ComRiverpodObserver()],
      child: FlutterPortfolio(),
    ),
  );
}
