import 'package:flutter/foundation.dart';

export 'assets.gen.dart';
export 'theme.dart';

const double kAppBarHeight = 80;
const double kAppBodyWidth = 1100;

class C {
  static bool get isMobile =>
      defaultTargetPlatform == TargetPlatform.android ||
      defaultTargetPlatform == TargetPlatform.iOS;

  static final media = _Media();
  static final url = _Url();
}

class _Media {
  final medium = 600;
}

class _Url {
  final cs50xAddress = Uri.https('cs50.harvard.edu', 'x');
  final resumeAddress = Uri.https(
    'github.com',
    'saifymatteo/saifymatteo/releases/latest/download/Resume.Saiful.Mashuri.pdf',
  );
  final emailAddress = Uri(
    scheme: 'mailto',
    path: 'work@saifulmashuri.com',
  );
  final whatsAppAddress = Uri.https('wa.link', 'xz2e7j');
}
