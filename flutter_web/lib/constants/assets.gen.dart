// dart format width=80

/// GENERATED CODE - DO NOT MODIFY BY HAND
/// *****************************************************
///  FlutterGen
/// *****************************************************

// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: deprecated_member_use,directives_ordering,implicit_dynamic_list_literal,unnecessary_import

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

  /// Directory path: assets/portfolios/isc_workflow
  $AssetsPortfoliosIscWorkflowGen get iscWorkflow =>
      const $AssetsPortfoliosIscWorkflowGen();

  /// Directory path: assets/portfolios/my_kampus_radio
  $AssetsPortfoliosMyKampusRadioGen get myKampusRadio =>
      const $AssetsPortfoliosMyKampusRadioGen();

  /// Directory path: assets/portfolios/sansols
  $AssetsPortfoliosSansolsGen get sansols =>
      const $AssetsPortfoliosSansolsGen();
}

class $AssetsPortfoliosIscWorkflowGen {
  const $AssetsPortfoliosIscWorkflowGen();

  /// File path: assets/portfolios/isc_workflow/isc-home.png
  AssetGenImage get iscHome =>
      const AssetGenImage('assets/portfolios/isc_workflow/isc-home.png');

  /// File path: assets/portfolios/isc_workflow/isc-kgc-listing.png
  AssetGenImage get iscKgcListing =>
      const AssetGenImage('assets/portfolios/isc_workflow/isc-kgc-listing.png');

  /// File path: assets/portfolios/isc_workflow/isc-landing.png
  AssetGenImage get iscLanding =>
      const AssetGenImage('assets/portfolios/isc_workflow/isc-landing.png');

  /// File path: assets/portfolios/isc_workflow/isc-listing.png
  AssetGenImage get iscListing =>
      const AssetGenImage('assets/portfolios/isc_workflow/isc-listing.png');

  /// File path: assets/portfolios/isc_workflow/isc-logo.png
  AssetGenImage get iscLogo =>
      const AssetGenImage('assets/portfolios/isc_workflow/isc-logo.png');

  /// List of all assets
  List<AssetGenImage> get values => [
    iscHome,
    iscKgcListing,
    iscLanding,
    iscListing,
    iscLogo,
  ];
}

class $AssetsPortfoliosMyKampusRadioGen {
  const $AssetsPortfoliosMyKampusRadioGen();

  /// File path: assets/portfolios/my_kampus_radio/mkr-home-mobile.png
  AssetGenImage get mkrHomeMobile => const AssetGenImage(
    'assets/portfolios/my_kampus_radio/mkr-home-mobile.png',
  );

  /// File path: assets/portfolios/my_kampus_radio/mkr-home.png
  AssetGenImage get mkrHome =>
      const AssetGenImage('assets/portfolios/my_kampus_radio/mkr-home.png');

  /// File path: assets/portfolios/my_kampus_radio/mkr-logo.png
  AssetGenImage get mkrLogo =>
      const AssetGenImage('assets/portfolios/my_kampus_radio/mkr-logo.png');

  /// File path: assets/portfolios/my_kampus_radio/mkr-side-panel-mobile.png
  AssetGenImage get mkrSidePanelMobile => const AssetGenImage(
    'assets/portfolios/my_kampus_radio/mkr-side-panel-mobile.png',
  );

  /// File path: assets/portfolios/my_kampus_radio/mkr-side-panel.png
  AssetGenImage get mkrSidePanel => const AssetGenImage(
    'assets/portfolios/my_kampus_radio/mkr-side-panel.png',
  );

  /// List of all assets
  List<AssetGenImage> get values => [
    mkrHomeMobile,
    mkrHome,
    mkrLogo,
    mkrSidePanelMobile,
    mkrSidePanel,
  ];
}

class $AssetsPortfoliosSansolsGen {
  const $AssetsPortfoliosSansolsGen();

  /// File path: assets/portfolios/sansols/sansols-employer-ap-details.png
  AssetGenImage get sansolsEmployerApDetails => const AssetGenImage(
    'assets/portfolios/sansols/sansols-employer-ap-details.png',
  );

  /// File path: assets/portfolios/sansols/sansols-employer-ap-listing.png
  AssetGenImage get sansolsEmployerApListing => const AssetGenImage(
    'assets/portfolios/sansols/sansols-employer-ap-listing.png',
  );

  /// File path: assets/portfolios/sansols/sansols-gov-home-page.png
  AssetGenImage get sansolsGovHomePage => const AssetGenImage(
    'assets/portfolios/sansols/sansols-gov-home-page.png',
  );

  /// File path: assets/portfolios/sansols/sansols-landing.png
  AssetGenImage get sansolsLanding =>
      const AssetGenImage('assets/portfolios/sansols/sansols-landing.png');

  /// File path: assets/portfolios/sansols/sansols-logo.png
  AssetGenImage get sansolsLogo =>
      const AssetGenImage('assets/portfolios/sansols/sansols-logo.png');

  /// List of all assets
  List<AssetGenImage> get values => [
    sansolsEmployerApDetails,
    sansolsEmployerApListing,
    sansolsGovHomePage,
    sansolsLanding,
    sansolsLogo,
  ];
}

class AppAssets {
  const AppAssets._();

  static const $AssetsIconsGen icons = $AssetsIconsGen();
  static const $AssetsImagesGen images = $AssetsImagesGen();
  static const $AssetsPortfoliosGen portfolios = $AssetsPortfoliosGen();
}

class AssetGenImage {
  const AssetGenImage(
    this._assetName, {
    this.size,
    this.flavors = const {},
    this.animation,
  });

  final String _assetName;

  final Size? size;
  final Set<String> flavors;
  final AssetGenImageAnimation? animation;

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
    bool gaplessPlayback = true,
    bool isAntiAlias = false,
    String? package,
    FilterQuality filterQuality = FilterQuality.medium,
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

  ImageProvider provider({AssetBundle? bundle, String? package}) {
    return AssetImage(_assetName, bundle: bundle, package: package);
  }

  String get path => _assetName;

  String get keyName => _assetName;
}

class AssetGenImageAnimation {
  const AssetGenImageAnimation({
    required this.isAnimation,
    required this.duration,
    required this.frames,
  });

  final bool isAnimation;
  final Duration duration;
  final int frames;
}
