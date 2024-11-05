import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  AppTheme._();

  static final instance = AppTheme._();

  static const black = Color(0xff1A1A1A);
  static const grey = Color(0xff2E2E2E);

  ThemeData get theme => ThemeData(
        colorSchemeSeed: AppTheme.black,
        textTheme: _textTheme,
        primaryTextTheme: _textTheme,
        // Button theme
        splashFactory: NoSplash.splashFactory,
        hoverColor: Colors.transparent,
        highlightColor: Colors.transparent,
      );

  ThemeData get dark => theme.copyWith();

  TextTheme get _textTheme => GoogleFonts.poppinsTextTheme(
        const TextTheme(
          displaySmall: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 40,
            color: black,
          ),
          headlineMedium: TextStyle(
            fontWeight: FontWeight.w500,
            color: black,
            fontSize: 32,
          ),
          titleLarge: TextStyle(
            fontWeight: FontWeight.bold,
            color: black,
          ),
          titleMedium: TextStyle(
            color: black,
          ),
        ),
      );
}
