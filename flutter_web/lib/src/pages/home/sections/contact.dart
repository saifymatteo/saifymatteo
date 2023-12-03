part of '../page.dart';

class _ContactSection extends StatelessWidget {
  const _ContactSection({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.appL10n;

    return WebBodyBase(
      decoration: const BoxDecoration(
        color: AppTheme.black,
      ),
      children: [
        TitleText(
          text: l10n.contactMe,
          color: Colors.white,
        ),
        const SizedBox(height: 30),
        BodyText(
          text: l10n.contactMeDescription,
          color: Colors.white,
        ),
        const SizedBox(height: 60),
        Wrap(
          spacing: 60,
          runSpacing: 30,
          alignment: WrapAlignment.center,
          children: [
            _Button(
              label: l10n.resume,
              onTap: () => launchUrl(C.url.resumeAddress),
            ),
            _Button(
              label: l10n.email,
              onTap: () => launchUrl(C.url.emailAddress),
            ),
            _Button(
              label: l10n.whatsApp,
              onTap: () => launchUrl(C.url.whatsAppAddress),
            ),
          ],
        ),
      ],
    );
  }
}

class _Button extends StatefulWidget {
  const _Button({required this.label, this.onTap});

  final String label;
  final VoidCallback? onTap;

  @override
  State<_Button> createState() => _ButtonState();
}

class _ButtonState extends State<_Button> {
  bool _isHover = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: widget.onTap,
      onHover: (value) => setState(() => _isHover = value),
      child: AnimatedContainer(
        duration: 300.milliseconds,
        curve: Curves.fastEaseInToSlowEaseOut,
        width: 188,
        padding: const EdgeInsets.symmetric(vertical: 18),
        decoration: BoxDecoration(
          color: _isHover ? AppTheme.grey : Colors.white,
          borderRadius: BorderRadius.circular(50),
        ),
        child: Animate(
          effects: [
            ScaleEffect(
              begin: const Offset(1, 1),
              end: const Offset(1.1, 1.1),
              duration: 500.milliseconds,
              curve: Curves.fastEaseInToSlowEaseOut,
            ),
          ],
          target: _isHover ? 1 : 0,
          child: Text(
            widget.label,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: _isHover ? Colors.white : AppTheme.grey,
                ),
          ),
        ),
      ),
    );
  }
}
