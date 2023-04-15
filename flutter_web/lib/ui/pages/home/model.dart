import 'package:freezed_annotation/freezed_annotation.dart';

part 'model.freezed.dart';

@freezed
class PortfolioHomeModel with _$PortfolioHomeModel {
  factory PortfolioHomeModel({
    required String name,
    required List<String> counter,
  }) = _PortfolioHomeModel;
}
