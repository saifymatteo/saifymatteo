import 'package:flutter/material.dart';

class PortfolioMainBodyBase extends StatelessWidget {
  const PortfolioMainBodyBase({
    required this.body,
    super.key,
  });

  final Widget body;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(child: body);
  }
}
