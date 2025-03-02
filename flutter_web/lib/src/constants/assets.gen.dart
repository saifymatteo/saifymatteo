/// GENERATED CODE - DO NOT MODIFY BY HAND
/// *****************************************************
///  FlutterGen
/// *****************************************************

// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: directives_ordering,unnecessary_import,implicit_dynamic_list_literal,deprecated_member_use

import 'package:flutter/widgets.dart';

class $AssetsIconsGen {
  const $AssetsIconsGen();

  /// File path: assets/icons/logo-circle.png
  AssetGenImage get logoCircle =>
      const AssetGenImage('assets/icons/logo-circle.png');

  /// File path: assets/icons/logo-rectangle.png
  AssetGenImage get logoRectangle =>
      const AssetGenImage('assets/icons/logo-rectangle.png');

  /// List of all assets
  List<AssetGenImage> get values => [logoCircle, logoRectangle];
}

class $AssetsImagesGen {
  const $AssetsImagesGen();

  /// File path: assets/images/me-maskable.png
  AssetGenImage get meMaskable =>
      const AssetGenImage('assets/images/me-maskable.png');

  /// List of all assets
  List<AssetGenImage> get values => [meMaskable];
}

class $AssetsPortfoliosGen {
  const $AssetsPortfoliosGen();

  /// File path: assets/portfolios/logo-isc-workflow.png
  AssetGenImage get logoIscWorkflow =>
      const AssetGenImage('assets/portfolios/logo-isc-workflow.png');

  /// File path: assets/portfolios/logo-mkr.png
  AssetGenImage get logoMkr =>
      const AssetGenImage('assets/portfolios/logo-mkr.png');

  /// File path: assets/portfolios/logo-sansols.png
  AssetGenImage get logoSansols =>
      const AssetGenImage('assets/portfolios/logo-sansols.png');

  /// List of all assets
  List<AssetGenImage> get values => [logoIscWorkflow, logoMkr, logoSansols];
}

class AppAssets {
  AppAssets._();

  static const $AssetsIconsGen icons = $AssetsIconsGen();
  static const $AssetsImagesGen images = $AssetsImagesGen();
  static const $AssetsPortfoliosGen portfolios = $AssetsPortfoliosGen();
}

class AssetGenImage {
  const AssetGenImage(this._assetName);

  final String _assetName;

  Image image({
    Key? key,
    AssetBundle? bundle,
    ImageFrameBuilder? frameBuilder,
    ImageErrorWidgetBuilder? errorBuilder,
    String? semanticLabel,
    bool excludeFromSemantics = false,
    double? scale,
    double? width,
    double? height,
    Color? color,
    Animation<double>? opacity,
    BlendMode? colorBlendMode,
    BoxFit? fit,
    AlignmentGeometry alignment = Alignment.center,
    ImageRepeat repeat = ImageRepeat.noRepeat,
    Rect? centerSlice,
    bool matchTextDirection = false,
    bool gaplessPlayback = false,
    bool isAntiAlias = false,
    String? package,
    FilterQuality filterQuality = FilterQuality.low,
    int? cacheWidth,
    int? cacheHeight,
  }) {
    return Image.asset(
      _assetName,
      key: key,
      bundle: bundle,
      frameBuilder: frameBuilder,
      errorBuilder: errorBuilder,
      semanticLabel: semanticLabel,
      excludeFromSemantics: excludeFromSemantics,
      scale: scale,
      width: width,
      height: height,
      color: color,
      opacity: opacity,
      colorBlendMode: colorBlendMode,
      fit: fit,
      alignment: alignment,
      repeat: repeat,
      centerSlice: centerSlice,
      matchTextDirection: matchTextDirection,
      gaplessPlayback: gaplessPlayback,
      isAntiAlias: isAntiAlias,
      package: package,
      filterQuality: filterQuality,
      cacheWidth: cacheWidth,
      cacheHeight: cacheHeight,
    );
  }

  ImageProvider provider({
    AssetBundle? bundle,
    String? package,
  }) {
    return AssetImage(
      _assetName,
      bundle: bundle,
      package: package,
    );
  }

  String get path => _assetName;

  String get keyName => _assetName;
}
