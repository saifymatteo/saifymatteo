part of '../page.dart';

class _PortfolioSection extends StatelessWidget {
  const _PortfolioSection({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      children: [
        TitleText(text: l10n.myWorks),
        const SizedBox(height: 30),
        const Wrap(
          spacing: 48,
          runSpacing: 48,
          alignment: WrapAlignment.center,
          children: [
            _SansolsCard(),
            _IscWorkflowCard(),
            _MyKampusRadioCard(),
          ],
        ),
      ],
    );
  }
}

class _SansolsCard extends StatelessWidget {
  const _SansolsCard();

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return _PortfolioCard(
      image: AppAssets.portfolios.logoSansols.provider(),
      tooltipContent: _TooltipContent(
        title: l10n.sansolsTitle,
        description: l10n.sansolsDescription,
        summaries: [
          _Summaries(
            title: l10n.sansolsFeatureEmployerTitle,
            highlights: [
              l10n.sansolsFeatureEmployerPoint1,
              l10n.sansolsFeatureEmployerPoint2,
            ],
          ),
          _Summaries(
            title: l10n.sansolsFeatureAdminTitle,
            highlights: [
              l10n.sansolsFeatureAdminPoint1,
              l10n.sansolsFeatureAdminPoint2,
            ],
          ),
          _Summaries(
            highlights: [
              l10n.sansolsContributionPoint1,
              l10n.sansolsContributionPoint2,
              l10n.sansolsContributionPoint3,
              l10n.sansolsContributionPoint4,
            ],
          ),
        ],
        links: const [
          _LabelAndLink(
            label: 'Web App (Employer)',
            link: 'https://sansols.sarawak.gov.my/',
          ),
          _LabelAndLink(
            label: 'Web App (Government)',
            link: 'https://sansols.sarawak.gov.my/panel/',
          ),
        ],
      ),
    );
  }
}

class _IscWorkflowCard extends StatelessWidget {
  const _IscWorkflowCard();

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return _PortfolioCard(
      image: AppAssets.portfolios.logoIscWorkflow.provider(),
      tooltipContent: _TooltipContent(
        title: l10n.iscTitle,
        description: l10n.iscDescription,
        summaries: [
          _Summaries(
            title: l10n.iscFeatureTitle,
            highlights: [
              l10n.iscFeaturePoint1,
              l10n.iscFeaturePoint2,
              l10n.iscFeaturePoint3,
              l10n.iscFeaturePoint4,
            ],
          ),
          _Summaries(
            highlights: [
              l10n.iscContributionPoint1,
              l10n.iscContributionPoint2,
              l10n.iscContributionPoint3,
              l10n.iscContributionPoint4,
            ],
          ),
        ],
        links: const [
          _LabelAndLink(
            label: 'Website',
            link: 'https://isarawakcare.sarawak.gov.my/',
          ),
          _LabelAndLink(
            label: 'Web App',
            link: 'https://isarawakcare.sarawak.gov.my/apply-now/',
          ),
        ],
      ),
    );
  }
}

class _MyKampusRadioCard extends StatelessWidget {
  const _MyKampusRadioCard();

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return _PortfolioCard(
      image: AppAssets.portfolios.logoMkr.provider(),
      tooltipContent: _TooltipContent(
        title: l10n.mkrTitle,
        description: l10n.mkrDescription,
        summaries: [
          _Summaries(
            title: l10n.mkrFeatureTitle,
            highlights: [
              l10n.mkrFeaturePoint1,
              l10n.mkrFeaturePoint2,
            ],
          ),
          _Summaries(
            highlights: [
              l10n.mkrContributionPoint1,
              l10n.mkrContributionPoint2,
            ],
          ),
        ],
        links: const [
          _LabelAndLink(
            label: 'Website',
            link: 'https://mykampusradio.com/',
          ),
          _LabelAndLink(
            label: 'Web App',
            link: 'https://mkr.saifulmashuri.com/',
          ),
          _LabelAndLink(
            label: 'GitHub',
            link: 'https://github.com/saifymatteo/MKR-Unofficial-App-Flutter',
          ),
        ],
      ),
    );
  }
}

class _PortfolioCard extends StatefulWidget {
  const _PortfolioCard({required this.image, required this.tooltipContent});

  final ImageProvider image;
  final _TooltipContent tooltipContent;

  @override
  State<_PortfolioCard> createState() => _PortfolioCardState();
}

class _PortfolioCardState extends State<_PortfolioCard> {
  bool _isHover = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHover = true),
      onExit: (_) => setState(() => _isHover = false),
      child: TooltipVisibility(
        visible: _isHover,
        child: Tooltip(
          richMessage: WidgetSpan(child: widget.tooltipContent),
          padding: EdgeInsets.zero,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: const [
              BoxShadow(
                color: Colors.black38,
                blurRadius: 10,
                offset: Offset(0, 10),
              ),
            ],
          ),
          triggerMode: TooltipTriggerMode.manual,
          child: Card(
            elevation: 6,
            color: _isHover ? Colors.grey.shade200 : Colors.white,
            surfaceTintColor: Colors.transparent,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(20),
              ),
            ),
            child: Ink.image(
              image: widget.image,
              fit: BoxFit.fitHeight,
              width: 466,
              height: 204,
            ),
          ),
        ),
      ),
    );
  }
}

class _TooltipContent extends StatelessWidget {
  const _TooltipContent({
    required this.title,
    required this.description,
    this.summaries,
    this.links,
  });

  final String title;
  final String description;
  final List<_Summaries>? summaries;
  final List<_LabelAndLink>? links;

  @override
  Widget build(BuildContext context) {
    return SelectionArea(
      child: Container(
        width: 798,
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 40),
        child: DefaultTextStyle.merge(
          style: const TextStyle(height: 2),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TitleText(text: title),
              const SizedBox(height: 18),
              Text(description),
              if (summaries != null && summaries!.isNotEmpty)
                for (final summary in summaries!) ...[
                  const SizedBox(height: 18),
                  Text(
                    summary.title,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  if (summary.highlights.isNotEmpty)
                    for (final highlight in summary.highlights)
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(width: 8),
                          const Text('•'),
                          const SizedBox(width: 8),
                          Flexible(child: Text(highlight)),
                        ],
                      ),
                ],
              if (links != null && links!.isNotEmpty) ...[
                const SizedBox(height: 18),
                for (final i in links!)
                  Text.rich(
                    TextSpan(
                      children: [
                        TextSpan(text: '${i.label}: '),
                        TextSpan(
                          text: i.link,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                          recognizer: TapGestureRecognizer()
                            ..onTap = () => launchUrl(Uri.parse(i.link)),
                        ),
                      ],
                    ),
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _Summaries {
  const _Summaries({
    this.title = 'Contributions',
    this.highlights = const [],
  });

  final String title;
  final List<String> highlights;
}

class _LabelAndLink {
  const _LabelAndLink({required this.label, required this.link});

  final String label;
  final String link;
}
