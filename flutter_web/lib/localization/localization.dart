import 'package:flutter/material.dart';

import 'app_localizations.dart';

export 'app_localizations.dart';

extension AppLocalizationsContext on BuildContext {
  AppLocalizations get appL10n => AppLocalizations.of(this);
}
