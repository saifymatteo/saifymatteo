import 'dart:ui';

import 'package:auto_route/auto_route.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../lib.dart';
import '../components/components.dart';
import 'model.dart';

part 'repository.dart';

class PortfolioPagePath {
  const PortfolioPagePath._();

  static const sansols = 'sansols';
  static const iscWorkflow = 'isc-workflow';
  static const myKampusRadio = 'my-kampus-radio';
}

@RoutePage()
class PortfolioPage extends StatelessWidget {
  const PortfolioPage({super.key, @PathParam('title') required this.pathTitle});

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
        Image(image: portfolio.image, width: 464, height: 182),
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
                    ),
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
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 34),
        Wrap(
          alignment: WrapAlignment.center,
          spacing: 20,
          runSpacing: 20,
          children: links.map((e) => _LinksSectionItem(link: e)).toList(),
        ),
      ],
    );
  }
}

class _LinksSectionItem extends StatefulWidget {
  const _LinksSectionItem({required this.link});

  final PortfolioLabelAndLink link;

  @override
  State<_LinksSectionItem> createState() => __LinksSectionItemState();
}

class __LinksSectionItemState extends State<_LinksSectionItem> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => launchUrl(Uri.parse(widget.link.link)),
      onHover: (value) => setState(() => _isHovering = value),
      child: DecoratedBox(
        position: DecorationPosition.foreground,
        decoration: BoxDecoration(
          border: Border.all(color: AppTheme.black, width: 2),
          borderRadius: BorderRadius.circular(12),
        ),
        child: ClipRRect(
          clipBehavior: Clip.hardEdge,
          borderRadius: BorderRadius.circular(12),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                decoration: BoxDecoration(
                  color: _isHovering ? Colors.white : AppTheme.grey,
                  border: Border(
                    right: BorderSide(color: AppTheme.black, width: 2),
                  ),
                ),
                padding: const EdgeInsets.all(8),
                child: Row(
                  children: [
                    Icon(
                      widget.link.icon,
                      size: 24,
                      color: _isHovering ? AppTheme.grey : Colors.white,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      widget.link.label,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: _isHovering ? AppTheme.grey : Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  widget.link.link,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
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
        TitleText(text: l10n.media, color: Colors.white),
        const SizedBox(height: 34),
        if (media.isEmpty)
          const Text(
            'Coming soon...',
            style: TextStyle(color: Colors.white, fontStyle: FontStyle.italic),
            textAlign: TextAlign.center,
          )
        else
          LayoutBuilder(
            builder: (context, constraints) {
              final isSmallLayout = constraints.maxWidth > C.media.medium
                  ? false
                  : true;

              return Column(
                spacing: 12,
                children: [
                  if (isSmallLayout)
                    ...List.generate(media.length, (index) {
                      return _MediaSectionsItem(
                        allMedia: media,
                        media: media[index],
                        maxWidth: constraints.maxWidth,
                      );
                    })
                  else
                    for (var i = 0; i < media.length; i += 2)
                      Row(
                        spacing: 12,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          for (var j = i; j < i + 2 && j < media.length; j++)
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(6.0),
                                child: _MediaSectionsItem(
                                  allMedia: media,
                                  media: media[j],
                                  maxWidth: constraints.maxWidth / 2 - 16,
                                ),
                              ),
                            ),
                        ],
                      ),
                ],
              );
            },
          ),
      ],
    );
  }
}

class _MediaSectionsItem extends StatelessWidget {
  const _MediaSectionsItem({
    required this.allMedia,
    required this.media,
    required this.maxWidth,
  });

  final List<PortfolioMedia> allMedia;
  final PortfolioMedia media;
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => showDialog(
        context: context,
        useRootNavigator: true,
        fullscreenDialog: true,
        builder: (context) {
          return _MediaSectionsItemDialog(allMedia: allMedia, media: media);
        },
      ),
      child: Column(
        children: [
          DecoratedBox(
            position: DecorationPosition.foreground,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.white, width: 2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: ClipRRect(
              clipBehavior: Clip.hardEdge,
              borderRadius: BorderRadius.circular(12),
              child: Image(
                image: media.image,
                fit: BoxFit.cover,
                width: maxWidth,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            media.label,
            style: AppTheme.instance.theme.textTheme.labelMedium?.copyWith(
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}

class _MediaSectionsItemDialog extends StatefulWidget {
  const _MediaSectionsItemDialog({required this.allMedia, required this.media});

  final List<PortfolioMedia> allMedia;
  final PortfolioMedia media;

  @override
  State<_MediaSectionsItemDialog> createState() =>
      _MediaSectionsItemDialogState();
}

class _MediaSectionsItemDialogState extends State<_MediaSectionsItemDialog> {
  late PortfolioMedia _currentMedia = widget.media;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.black38,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Stack(
          children: [
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Flexible(
                    child: Padding(
                      padding: EdgeInsets.only(
                        left: 40,
                        right: 40,
                        top: 20,
                        bottom: 20,
                      ),
                      child: DecoratedBox(
                        position: DecorationPosition.foreground,
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.white, width: 2),
                        ),
                        child: Image(image: _currentMedia.image),
                      ),
                    ),
                  ),
                  Text(
                    _currentMedia.label,
                    style: AppTheme.instance.theme.textTheme.displayLarge
                        ?.copyWith(color: Colors.white),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
            Positioned(
              left: 0,
              height: MediaQuery.sizeOf(context).height,
              width: MediaQuery.sizeOf(context).width / 2,
              child: InkWell(
                onTap: () {
                  final currentIndex = widget.allMedia.indexOf(_currentMedia);
                  final prevIndex = (currentIndex - 1) % widget.allMedia.length;
                  setState(() {
                    _currentMedia = widget.allMedia[prevIndex];
                  });
                },
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Icon(
                    Icons.chevron_left,
                    color: Colors.white.withAlpha(100),
                    size: 80,
                  ),
                ),
              ),
            ),
            Positioned(
              right: 0,
              height: MediaQuery.sizeOf(context).height,
              width: MediaQuery.sizeOf(context).width / 2,
              child: InkWell(
                onTap: () {
                  final currentIndex = widget.allMedia.indexOf(_currentMedia);
                  final nextIndex = (currentIndex + 1) % widget.allMedia.length;
                  setState(() {
                    _currentMedia = widget.allMedia[nextIndex];
                  });
                },
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Icon(
                    Icons.chevron_right,
                    color: Colors.white.withAlpha(100),
                    size: 80,
                  ),
                ),
              ),
            ),
            Positioned(
              right: 0,
              top: 0,
              child: InkWell(
                onTap: () => context.maybePop(),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Icon(
                    Icons.close,
                    color: Colors.white.withAlpha(100),
                    size: 60,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
