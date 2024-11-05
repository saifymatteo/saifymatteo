part of 'page.dart';

class _PortfolioSansols extends PortfolioModel {
  _PortfolioSansols({required AppLocalizations l10n})
      : super(
          image: AppAssets.portfolios.logoSansols.provider(),
          title: l10n.sansolsTitle,
          description: l10n.sansolsDescription,
          summaries: [
            PortfolioSummary(
              title: l10n.sansolsFeatureEmployerTitle,
              highlights: [
                l10n.sansolsFeatureEmployerPoint1,
                l10n.sansolsFeatureEmployerPoint2,
              ],
            ),
            PortfolioSummary(
              title: l10n.sansolsFeatureAdminTitle,
              highlights: [
                l10n.sansolsFeatureAdminPoint1,
                l10n.sansolsFeatureAdminPoint2,
              ],
            ),
            PortfolioSummary(
              highlights: [
                l10n.sansolsContributionPoint1,
                l10n.sansolsContributionPoint2,
                l10n.sansolsContributionPoint3,
                l10n.sansolsContributionPoint4,
              ],
            ),
          ],
          links: const [
            PortfolioLabelAndLink(
              label: 'Web App (Employer)',
              link: 'https://sansols.sarawak.gov.my/',
            ),
            PortfolioLabelAndLink(
              label: 'Web App (Government)',
              link: 'https://sansols.sarawak.gov.my/panel/',
            ),
          ],
          media: [],
        );
}

class _PortfolioIscWorkflow extends PortfolioModel {
  _PortfolioIscWorkflow({required AppLocalizations l10n})
      : super(
          image: AppAssets.portfolios.logoIscWorkflow.provider(),
          title: l10n.iscTitle,
          description: l10n.iscDescription,
          summaries: [
            PortfolioSummary(
              title: l10n.iscFeatureTitle,
              highlights: [
                l10n.iscFeaturePoint1,
                l10n.iscFeaturePoint2,
                l10n.iscFeaturePoint3,
                l10n.iscFeaturePoint4,
              ],
            ),
            PortfolioSummary(
              highlights: [
                l10n.iscContributionPoint1,
                l10n.iscContributionPoint2,
                l10n.iscContributionPoint3,
                l10n.iscContributionPoint4,
              ],
            ),
          ],
          links: const [
            PortfolioLabelAndLink(
              label: 'Website',
              link: 'https://isarawakcare.sarawak.gov.my/',
            ),
            PortfolioLabelAndLink(
              label: 'Web App',
              link: 'https://isarawakcare.sarawak.gov.my/apply-now/',
            ),
          ],
          media: [],
        );
}

class _PortfolioMyKampusRadio extends PortfolioModel {
  _PortfolioMyKampusRadio({required AppLocalizations l10n})
      : super(
          image: AppAssets.portfolios.logoMkr.provider(),
          title: l10n.mkrTitle,
          description: l10n.mkrDescription,
          summaries: [
            PortfolioSummary(
              title: l10n.mkrFeatureTitle,
              highlights: [
                l10n.mkrFeaturePoint1,
                l10n.mkrFeaturePoint2,
              ],
            ),
            PortfolioSummary(
              highlights: [
                l10n.mkrContributionPoint1,
                l10n.mkrContributionPoint2,
              ],
            ),
          ],
          links: const [
            PortfolioLabelAndLink(
              label: 'Website',
              link: 'https://mykampusradio.com/',
            ),
            PortfolioLabelAndLink(
              label: 'Web App',
              link: 'https://mkr.saifulmashuri.com/',
            ),
            PortfolioLabelAndLink(
              label: 'GitHub',
              link: 'https://github.com/saifymatteo/MKR-Unofficial-App-Flutter',
            ),
          ],
          media: [],
        );
}
