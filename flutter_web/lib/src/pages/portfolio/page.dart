import 'package:auto_route/annotations.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../lib.dart';
import '../components/components.dart';
import 'model.dart';

part 'repository.dart';

class PortfolioPagePath {
  const PortfolioPagePath._();

  static const sansols = 'sansols';
  static const iscWorkflow = 'isc-workflow';
  static const myKampusRadio = 'mykampus-radio';
}

@RoutePage()
class PortfolioPage extends StatelessWidget {
  const PortfolioPage({
    super.key,
    @PathParam('title') required this.pathTitle,
  });

  /// Only used for URL path
  final String pathTitle;

  @override
  Widget build(BuildContext context) {
    final portfolio = _repo(context);

    return BasePage(
      children: [
        _HeaderSection(portfolio: portfolio),
        if (portfolio.summaries != null)
          _SummariesSection(summaries: portfolio.summaries!),
        if (portfolio.links != null) _LinksSection(links: portfolio.links!),
        if (portfolio.media != null) _MediaSections(media: portfolio.media!),
      ],
    );
  }

  PortfolioModel _repo(BuildContext context) {
    final l10n = context.appL10n;

    if (pathTitle == PortfolioPagePath.sansols) {
      return _PortfolioSansols(l10n: l10n);
    }
    if (pathTitle == PortfolioPagePath.iscWorkflow) {
      return _PortfolioIscWorkflow(l10n: l10n);
    }
    if (pathTitle == PortfolioPagePath.myKampusRadio) {
      return _PortfolioMyKampusRadio(l10n: l10n);
    }

    throw UnimplementedError();
  }
}

class _HeaderSection extends StatelessWidget {
  const _HeaderSection({required this.portfolio});

  final PortfolioModel portfolio;

  @override
  Widget build(BuildContext context) {
    return WebBodyBase(
      children: [
        Image(
          image: portfolio.image,
          width: 464,
          height: 182,
        ),
        const SizedBox(height: 34),
        TitleText(text: portfolio.title),
        const SizedBox(height: 34),
        BodyText(text: portfolio.description),
      ],
    );
  }
}

class _SummariesSection extends StatelessWidget {
  const _SummariesSection({required this.summaries});

  final List<PortfolioSummary> summaries;

  @override
  Widget build(BuildContext context) {
    return WebBodyBase(
      decoration: const BoxDecoration(color: AppTheme.black),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: summaries.length,
        itemBuilder: (context, index) {
          final summary = summaries[index];

          return Column(
            children: [
              Text(
                summary.title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 34),
              Wrap(
                spacing: 20,
                runSpacing: 20,
                children: [
                  for (final highlight in summary.highlights)
                    Stack(
                      alignment: Alignment.centerLeft,
                      children: [
                        Container(
                          width: 540,
                          decoration: BoxDecoration(
                            color: AppTheme.grey,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          padding: const EdgeInsets.fromLTRB(24, 10, 12, 10),
                          child: Text(
                            highlight,
                            style: const TextStyle(color: Colors.white),
                          ),
                        ),
                        Positioned(
                          left: -12,
                          height: 24,
                          width: 24,
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(24),
                            ),
                          ),
                        ),
                      ],
                    )
                ],
              ),
            ],
          );
        },
        separatorBuilder: (context, index) => const SizedBox(height: 34),
      ),
    );
  }
}

class _LinksSection extends StatelessWidget {
  const _LinksSection({required this.links});

  final List<PortfolioLabelAndLink> links;

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      children: [
        Text(
          l10n.urls,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 34),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: links.length,
          itemBuilder: (context, index) {
            final link = links[index];

            return Text.rich(
              TextSpan(
                children: [
                  TextSpan(text: link.label),
                  const TextSpan(text: ': '),
                  TextSpan(
                    text: link.link,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      decoration: TextDecoration.underline,
                    ),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () => launchUrl(Uri.parse(link.link)),
                  ),
                ],
              ),
              textAlign: TextAlign.center,
            );
          },
          separatorBuilder: (context, index) => const SizedBox(height: 20),
        ),
      ],
    );
  }
}

class _MediaSections extends StatelessWidget {
  const _MediaSections({required this.media});

  final List<PortfolioMedia> media;

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      decoration: const BoxDecoration(color: AppTheme.black),
      children: [
        TitleText(
          text: l10n.media,
          color: Colors.white,
        ),
        const SizedBox(height: 34),
        if (media.isEmpty)
          const Text(
            'under construction 🚧',
            style: TextStyle(color: Colors.white),
            textAlign: TextAlign.center,
          ),
      ],
    );
  }
}
