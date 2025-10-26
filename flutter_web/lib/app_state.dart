import 'package:flutter/material.dart';

enum HomeSections { me, about, portfolio, contact }

class AppState {
  final Map<HomeSections, BuildContext> _scrollContext = {};

  Map<HomeSections, BuildContext> get scrollContext => Map.from(_scrollContext);

  void updateScrollContext(HomeSections section, BuildContext context) {
    _scrollContext[section] = context;
  }
}
