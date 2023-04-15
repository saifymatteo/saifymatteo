import 'package:freezed_annotation/freezed_annotation.dart';

part 'model.freezed.dart';

@freezed
class PortfolioAboutModel with _$PortfolioAboutModel {
  factory PortfolioAboutModel({
    required String name,
    required int counter,
  }) = _PortfolioAboutModel;
}
