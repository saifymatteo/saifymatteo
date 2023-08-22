import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_web/app.dart';
import 'package:flutter_web/flutter_web.dart';

void main() {
  setPathUrlStrategy();

  runApp(
    const ProviderScope(
      observers: [ComRiverpodObserver()],
      child: FlutterPortfolio(),
    ),
  );
}
