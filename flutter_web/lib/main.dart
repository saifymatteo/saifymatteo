import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_web/app.dart';
import 'package:log/log.dart';

void main() {
  Log.root.finest('APP STARTING');

  runApp(
    const ProviderScope(
      child: FlutterPortfolio(),
    ),
  );
}
