import 'package:flutter/material.dart';

class PortfolioModel {
  const PortfolioModel({
    required this.image,
    required this.title,
    required this.description,
    this.summaries,
    this.links,
    this.media,
  });

  final ImageProvider image;
  final String title;
  final String description;
  final List<PortfolioSummary>? summaries;
  final List<PortfolioLabelAndLink>? links;
  final List<PortfolioMedia>? media;
}

class PortfolioSummary {
  const PortfolioSummary({
    this.title = 'Contributions:',
    this.highlights = const [],
  });

  final String title;
  final List<String> highlights;
}

class PortfolioLabelAndLink {
  const PortfolioLabelAndLink({required this.label, required this.link});

  final String label;
  final String link;
}

class PortfolioMedia {
  const PortfolioMedia({required this.label, required this.image});

  final String label;
  final ImageProvider image;
}
