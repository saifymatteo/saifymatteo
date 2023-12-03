part of '../page.dart';

class _MeSection extends StatelessWidget {
  const _MeSection({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;
    final maxConstraints = MediaQuery.sizeOf(context).width < 920;
    final overlyMaxConstraints = MediaQuery.sizeOf(context).width < 760;

    return WebBodyBase(
      padding: EdgeInsets.zero,
      child: Stack(
        children: [
          Positioned(
            left: 0,
            top: 0,
            bottom: 0,
            child: AnimatedContainer(
              duration: 300.milliseconds,
              curve: Curves.fastEaseInToSlowEaseOut,
              padding: EdgeInsets.only(left: 20, top: maxConstraints ? 60 : 0),
              alignment:
              maxConstraints ? Alignment.topCenter : Alignment.center,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Flexible(
                    child: Text(
                      l10n.heyThere,
                      style: Theme.of(context).textTheme.displaySmall,
                    ),
                  ),
                  Flexible(
                    child: Text(
                      l10n.imSaifulMashuri,
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                  ),
                  Flexible(
                    child: Text(
                      l10n.aSoftwareDeveloper,
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                  ),
                  Flexible(
                    child: Text(
                      l10n.iCanMakeApps,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: AnimatedPadding(
              duration: 300.milliseconds,
              curve: Curves.fastEaseInToSlowEaseOut,
              padding: EdgeInsets.only(top: overlyMaxConstraints ? 220 : 0),
              child: AppAssets.images.meMaskable.image(
                  height: 498,
                  alignment: Alignment.bottomCenter,
                  fit: BoxFit.cover),
            ),
          ),
        ],
      ),
    );
  }
}