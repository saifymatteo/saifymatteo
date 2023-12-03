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
        Wrap(
          spacing: 48,
          runSpacing: 48,
          alignment: WrapAlignment.center,
          children: [
            _PortfolioCard(
              image: AppAssets.portfolios.logoSansols.provider(),
              tooltipContents: [],
            ),
            _PortfolioCard(
              image: AppAssets.portfolios.logoIscWorkflow.provider(),
              tooltipContents: const [
                TitleText(
                  text: 'Form Builer & Applications',
                ),
              ],
            ),
            _PortfolioCard(
              image: AppAssets.portfolios.logoMkr.provider(),
              tooltipContents: [],
            ),
          ],
        ),
      ],
    );
  }
}

class _PortfolioCard extends StatefulWidget {
  const _PortfolioCard({required this.image, required this.tooltipContents});

  final ImageProvider image;
  final List<Widget> tooltipContents;

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
          richMessage: WidgetSpan(
            child: Container(
              width: 798,
              height: 462,
              padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 40),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: widget.tooltipContents,
              ),
            ),
          ),
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
          verticalOffset: 102,
          child: Card(
            elevation: 6,
            color: Colors.white,
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
