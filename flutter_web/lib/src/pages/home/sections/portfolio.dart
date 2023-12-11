part of '../page.dart';

class _PortfolioSection extends StatefulWidget {
  const _PortfolioSection({required this.onBuildWidget});

  final ValueChanged<BuildContext> onBuildWidget;

  @override
  State<_PortfolioSection> createState() => _PortfolioSectionState();
}

class _PortfolioSectionState extends State<_PortfolioSection> {

  @override
  void initState() {
    super.initState();
    widget.onBuildWidget.call(context);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      children: [
        TitleText(text: l10n.myWorks),
        const SizedBox(height: 30),
        Wrap(
          spacing: 48,
          runSpacing: 48,
          alignment: WrapAlignment.center,
          children: [
            _PortfolioCard(
              image: AppAssets.portfolios.logoSansols.provider(),
              title: l10n.sansolsTitle,
              description: l10n.sansolsDescription,
              onTapCard: () => context.pushRoute(
                PortfolioPageRoute(pathTitle: PortfolioPagePath.sansols),
              ),
            ),
            _PortfolioCard(
              image: AppAssets.portfolios.logoIscWorkflow.provider(),
              title: l10n.iscTitle,
              description: l10n.iscDescription,
              onTapCard: () => context.pushRoute(
                PortfolioPageRoute(pathTitle: PortfolioPagePath.iscWorkflow),
              ),
            ),
            _PortfolioCard(
              image: AppAssets.portfolios.logoMkr.provider(),
              title: l10n.mkrTitle,
              description: l10n.mkrDescription,
              onTapCard: () => context.pushRoute(
                PortfolioPageRoute(pathTitle: PortfolioPagePath.myKampusRadio),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _PortfolioCard extends StatefulWidget {
  const _PortfolioCard({
    required this.image,
    required this.title,
    required this.description,
    this.onTapCard,
  });

  final ImageProvider image;

  final String title;
  final String description;
  final VoidCallback? onTapCard;

  @override
  State<_PortfolioCard> createState() => _PortfolioCardState();
}

class _PortfolioCardState extends State<_PortfolioCard> {
  bool _isHover = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: widget.onTapCard,
      onHover: (value) => setState(() => _isHover = value),
      child: Tooltip(
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
        verticalOffset: 102,
        richMessage: WidgetSpan(
          child: SelectionArea(
            child: Container(
              width: 798,
              padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 40),
              child: DefaultTextStyle.merge(
                style: const TextStyle(height: 2),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                    Text(
                      widget.description,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
                    ),
                    const SizedBox(height: 12),
                    InkWell(
                      onTap: widget.onTapCard,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          vertical: 6,
                          horizontal: 12,
                        ),
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: AppTheme.grey,
                            width: 0.5,
                          ),
                        ),
                        child: const Text('read more'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        child: Card(
          elevation: 6,
          color: _isHover ? Colors.grey.shade200 : Colors.white,
          surfaceTintColor: Colors.transparent,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(20),
            ),
          ),
          child: Image(
            image: widget.image,
            fit: BoxFit.fitHeight,
            width: 466,
            height: 204,
          ),
        ),
      ),
    );
  }
}
