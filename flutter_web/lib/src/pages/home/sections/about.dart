part of '../page.dart';

class _AboutSection extends StatefulWidget {
  const _AboutSection({
    this.onTapSeeWhatIDo,
    required this.onBuildWidget,
  });

  final ValueChanged<BuildContext> onBuildWidget;
  final VoidCallback? onTapSeeWhatIDo;

  @override
  State<_AboutSection> createState() => _AboutSectionState();
}

class _AboutSectionState extends State<_AboutSection> {

  @override
  void initState() {
    super.initState();
    widget.onBuildWidget.call(context);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;
    final isMobile = MediaQuery.sizeOf(context).width < C.media.medium;

    return WebBodyBase(
      decoration: const BoxDecoration(
        color: AppTheme.black,
      ),
      children: [
        Padding(
          padding: EdgeInsets.only(right: isMobile ? 0 : 192),
          child: Text(
            l10n.aboutMe,
            textAlign: isMobile ? TextAlign.center : TextAlign.right,
            style: Theme.of(context).textTheme.displaySmall?.copyWith(
                  color: Colors.white,
                ),
          ),
        ),
        const SizedBox(height: 34),
        Text.rich(
          TextSpan(
            children: [
              TextSpan(
                text: l10n.cs50x,
                style: const TextStyle(decoration: TextDecoration.underline),
                recognizer: TapGestureRecognizer()
                  ..onTap = () => launchUrl(C.url.cs50xAddress),
              ),
              const TextSpan(text: ' '),
              TextSpan(text: l10n.aboutMeDescription),
            ],
          ),
          textAlign: TextAlign.center,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white,
                height: 2,
              ),
        ),
        const SizedBox(height: 84),
        Center(
          child: InkWell(
            onTap: widget.onTapSeeWhatIDo,
            child: Column(
              children: [
                Text(
                  l10n.seeWhatIDo,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        color: Colors.white,
                      ),
                ),
                Animate(
                  effects: [
                    MoveEffect(
                      begin: const Offset(0, 0),
                      end: const Offset(0, 10),
                      duration: 500.milliseconds,
                      curve: Curves.fastEaseInToSlowEaseOut,
                    ),
                  ],
                  autoPlay: true,
                  onPlay: (controller) => controller.repeat(reverse: true),
                  child: const Icon(
                    Icons.arrow_drop_down,
                    color: Colors.white,
                    size: 40,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
