import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'localization/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[Locale('en')];

  /// No description provided for @portfolios.
  ///
  /// In en, this message translates to:
  /// **'Portfolios'**
  String get portfolios;

  /// No description provided for @contact.
  ///
  /// In en, this message translates to:
  /// **'Contact'**
  String get contact;

  /// No description provided for @heyThere.
  ///
  /// In en, this message translates to:
  /// **'Hey there'**
  String get heyThere;

  /// No description provided for @imSaifulMashuri.
  ///
  /// In en, this message translates to:
  /// **'I\'m Saiful Mashuri'**
  String get imSaifulMashuri;

  /// No description provided for @iCanMakeApps.
  ///
  /// In en, this message translates to:
  /// **'I can make apps for mobile, web and desktop'**
  String get iCanMakeApps;

  /// No description provided for @aboutMe.
  ///
  /// In en, this message translates to:
  /// **'About me'**
  String get aboutMe;

  /// No description provided for @harvardCs50x.
  ///
  /// In en, this message translates to:
  /// **'Harvard CS50x'**
  String get harvardCs50x;

  /// No description provided for @aboutMeDescription.
  ///
  /// In en, this message translates to:
  /// **'graduate in 2021, I started my Software Engineer career with Flutter Development in early 2022. I love software and exploring myself with electronic to further enhance my understanding of software and hardware. I dream of making things better with software and embedded electronic.'**
  String get aboutMeDescription;

  /// No description provided for @seeWhatIDo.
  ///
  /// In en, this message translates to:
  /// **'See what I do'**
  String get seeWhatIDo;

  /// No description provided for @myWorks.
  ///
  /// In en, this message translates to:
  /// **'My works'**
  String get myWorks;

  /// No description provided for @contributions.
  ///
  /// In en, this message translates to:
  /// **'Contributions'**
  String get contributions;

  /// No description provided for @urls.
  ///
  /// In en, this message translates to:
  /// **'URLs'**
  String get urls;

  /// No description provided for @media.
  ///
  /// In en, this message translates to:
  /// **'Media'**
  String get media;

  /// No description provided for @iscTitle.
  ///
  /// In en, this message translates to:
  /// **'Form Builder & Applications'**
  String get iscTitle;

  /// No description provided for @iscDescription.
  ///
  /// In en, this message translates to:
  /// **'Empowering the Ministry of Women, Early Childhood, and Community Wellbeing Development (KPWK) through a dedicated government application designed for seamless administration of Minister\'s benefits. The iSC Workflow app provides KPWK administrators with the tools to create and manage application forms, fostering accessibility for the public to apply for benefits effortlessly.'**
  String get iscDescription;

  /// No description provided for @iscFeatureTitle.
  ///
  /// In en, this message translates to:
  /// **'Key Features:'**
  String get iscFeatureTitle;

  /// No description provided for @iscFeaturePoint1.
  ///
  /// In en, this message translates to:
  /// **'Empowers administrators to construct application forms tailored to specific applicant requirements.'**
  String get iscFeaturePoint1;

  /// No description provided for @iscFeaturePoint2.
  ///
  /// In en, this message translates to:
  /// **'Enhances flexibility by allowing dynamic creation and modification of forms as needed.'**
  String get iscFeaturePoint2;

  /// No description provided for @iscFeaturePoint3.
  ///
  /// In en, this message translates to:
  /// **'Facilitates efficient processing by defining step-by-step procedures for application evaluation.'**
  String get iscFeaturePoint3;

  /// No description provided for @iscFeaturePoint4.
  ///
  /// In en, this message translates to:
  /// **'Incorporates an email notification system to notifies applicants promptly upon application approval or rejection.'**
  String get iscFeaturePoint4;

  /// No description provided for @iscContributionPoint1.
  ///
  /// In en, this message translates to:
  /// **'Responsible for seamlessly integrating the iSC Workflow with the State Integrated Financial, Budgeting, Accounting System (SIFBAS).'**
  String get iscContributionPoint1;

  /// No description provided for @iscContributionPoint2.
  ///
  /// In en, this message translates to:
  /// **'Co-led the integration of multilingual support, offering translations in Bahasa Malaysia, English, and Mandarin.'**
  String get iscContributionPoint2;

  /// No description provided for @iscContributionPoint3.
  ///
  /// In en, this message translates to:
  /// **'Played a key role in refactoring the form builder for optimal performance and user experience.'**
  String get iscContributionPoint3;

  /// No description provided for @iscContributionPoint4.
  ///
  /// In en, this message translates to:
  /// **'Ensured seamless integration with OVMI (One Voucher Multiple Instruction) based on past integration.'**
  String get iscContributionPoint4;

  /// No description provided for @sansolsTitle.
  ///
  /// In en, this message translates to:
  /// **'Sarawak Labour System'**
  String get sansolsTitle;

  /// No description provided for @sansolsDescription.
  ///
  /// In en, this message translates to:
  /// **'A revolutionary replacement for the existing Labour system/app utilized by the Sarawak state, the SANSOLS project is strategically designed to drastically reduce the processing time for handling Workers and Foreign Workers from 6-9 months to a mere 1-2 weeks. This comprehensive application provides two distinct roles, catering to both Administrators and Employers.'**
  String get sansolsDescription;

  /// No description provided for @sansolsFeatureEmployerTitle.
  ///
  /// In en, this message translates to:
  /// **'Key Features for Employers:'**
  String get sansolsFeatureEmployerTitle;

  /// No description provided for @sansolsFeatureEmployerPoint1.
  ///
  /// In en, this message translates to:
  /// **'Allows Employers to seamlessly apply for the recruitment of Non-Resident Employees, streamlining the hiring process.'**
  String get sansolsFeatureEmployerPoint1;

  /// No description provided for @sansolsFeatureEmployerPoint2.
  ///
  /// In en, this message translates to:
  /// **'Facilitates Employers in applying for the Approval in Principle (AP) to employ Non-Resident Employees.'**
  String get sansolsFeatureEmployerPoint2;

  /// No description provided for @sansolsFeatureAdminTitle.
  ///
  /// In en, this message translates to:
  /// **'Key Features for Administrators:'**
  String get sansolsFeatureAdminTitle;

  /// No description provided for @sansolsFeatureAdminPoint1.
  ///
  /// In en, this message translates to:
  /// **'Empowers Administrators to efficiently process applications submitted by Employers.'**
  String get sansolsFeatureAdminPoint1;

  /// No description provided for @sansolsFeatureAdminPoint2.
  ///
  /// In en, this message translates to:
  /// **'Involves multiple government agencies in the Approval in Principle (AP) process.'**
  String get sansolsFeatureAdminPoint2;

  /// No description provided for @sansolsContributionPoint1.
  ///
  /// In en, this message translates to:
  /// **'Co-led and served as the area owner for API clients utilized in the GraphQL architecture.'**
  String get sansolsContributionPoint1;

  /// No description provided for @sansolsContributionPoint2.
  ///
  /// In en, this message translates to:
  /// **'Spearheaded the project deployment across various environments.'**
  String get sansolsContributionPoint2;

  /// No description provided for @sansolsContributionPoint3.
  ///
  /// In en, this message translates to:
  /// **'Took charge of developing and implementing features related to the Approval in Principle (AP) processing on the government side.'**
  String get sansolsContributionPoint3;

  /// No description provided for @sansolsContributionPoint4.
  ///
  /// In en, this message translates to:
  /// **'Responsible for the authentication system, including login and registration processes.'**
  String get sansolsContributionPoint4;

  /// No description provided for @mkrTitle.
  ///
  /// In en, this message translates to:
  /// **'Youth-focused Media Platform'**
  String get mkrTitle;

  /// No description provided for @mkrDescription.
  ///
  /// In en, this message translates to:
  /// **'MyKampus Radio (MKR) is a media platform exclusively for youth, particularly students on college or university campuses. MKR serves as an engaging outlet for entertainment, political awareness, and the promotion of local artists (indie).'**
  String get mkrDescription;

  /// No description provided for @mkrFeatureTitle.
  ///
  /// In en, this message translates to:
  /// **'About the App:'**
  String get mkrFeatureTitle;

  /// No description provided for @mkrFeaturePoint1.
  ///
  /// In en, this message translates to:
  /// **'Designed to be a simple, cross-platform application, ensuring accessibility for a wide range of users.'**
  String get mkrFeaturePoint1;

  /// No description provided for @mkrFeaturePoint2.
  ///
  /// In en, this message translates to:
  /// **'Users can listen live to the official MKR online radio, offering a real-time audio experience.'**
  String get mkrFeaturePoint2;

  /// No description provided for @mkrContributionPoint1.
  ///
  /// In en, this message translates to:
  /// **'Solely responsible for the conception, design, and implementation of the MKR app.'**
  String get mkrContributionPoint1;

  /// No description provided for @mkrContributionPoint2.
  ///
  /// In en, this message translates to:
  /// **'Successfully integrated the MKR online radio into the app, a task that required reverse-engineering skills.'**
  String get mkrContributionPoint2;

  /// No description provided for @contactMe.
  ///
  /// In en, this message translates to:
  /// **'Contact me'**
  String get contactMe;

  /// No description provided for @contactMeDescription.
  ///
  /// In en, this message translates to:
  /// **'I’m excited to start a new project with you! For business enquiries, contact me.'**
  String get contactMeDescription;

  /// No description provided for @resume.
  ///
  /// In en, this message translates to:
  /// **'Resume'**
  String get resume;

  /// No description provided for @email.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @whatsApp.
  ///
  /// In en, this message translates to:
  /// **'WhatsApp'**
  String get whatsApp;

  /// No description provided for @madeWithFlutter.
  ///
  /// In en, this message translates to:
  /// **'Made with Flutter'**
  String get madeWithFlutter;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['en'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
