part of 'page.dart';

class _PortfolioSansols extends PortfolioModel {
  _PortfolioSansols({required AppLocalizations l10n})
    : super(
        image: AppAssets.portfolios.sansols.sansolsLogo.provider(),
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
            icon: Icons.web_asset,
            link: 'https://sansols.sarawak.gov.my/',
          ),
          PortfolioLabelAndLink(
            label: 'Web App (Government)',
            icon: Icons.web_asset,
            link: 'https://sansols.sarawak.gov.my/panel/',
          ),
        ],
        media: [
          PortfolioMedia(
            label: 'Landing Page',
            image: AppAssets.portfolios.sansols.sansolsLanding.provider(),
          ),
          PortfolioMedia(
            label: 'Government Home Page',
            image: AppAssets.portfolios.sansols.sansolsGovHomePage.provider(),
          ),
          PortfolioMedia(
            label: 'AP Listing Page',
            image: AppAssets.portfolios.sansols.sansolsEmployerApListing
                .provider(),
          ),
          PortfolioMedia(
            label: 'AP Details Page',
            image: AppAssets.portfolios.sansols.sansolsEmployerApDetails
                .provider(),
          ),
        ],
      );
}

class _PortfolioIscWorkflow extends PortfolioModel {
  _PortfolioIscWorkflow({required AppLocalizations l10n})
    : super(
        image: AppAssets.portfolios.iscWorkflow.iscLogo.provider(),
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
            icon: Icons.language,
            link: 'https://isarawakcare.sarawak.gov.my/',
          ),
          PortfolioLabelAndLink(
            label: 'Web App',
            icon: Icons.web_asset,
            link: 'https://isarawakcare.sarawak.gov.my/apply-now/',
          ),
        ],
        media: [
          PortfolioMedia(
            label: 'Landing Page',
            image: AppAssets.portfolios.iscWorkflow.iscLanding.provider(),
          ),
          PortfolioMedia(
            label: 'Home Page',
            image: AppAssets.portfolios.iscWorkflow.iscHome.provider(),
          ),
          PortfolioMedia(
            label: 'Listing Page',
            image: AppAssets.portfolios.iscWorkflow.iscListing.provider(),
          ),
          PortfolioMedia(
            label: 'KGC Listing Page',
            image: AppAssets.portfolios.iscWorkflow.iscKgcListing.provider(),
          ),
        ],
      );
}

class _PortfolioMyKampusRadio extends PortfolioModel {
  _PortfolioMyKampusRadio({required AppLocalizations l10n})
    : super(
        image: AppAssets.portfolios.myKampusRadio.mkrLogo.provider(),
        title: l10n.mkrTitle,
        description: l10n.mkrDescription,
        summaries: [
          PortfolioSummary(
            title: l10n.mkrFeatureTitle,
            highlights: [l10n.mkrFeaturePoint1, l10n.mkrFeaturePoint2],
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
            icon: Icons.language,
            link: 'https://mykampusradio.com/',
          ),
          PortfolioLabelAndLink(
            label: 'Web App',
            icon: Icons.web_asset,
            link: 'https://mkr.saifulmashuri.com/',
          ),
          PortfolioLabelAndLink(
            label: 'GitHub',
            icon: Icons.code,
            link: 'https://github.com/saifymatteo/MKR-Unofficial-App-Flutter',
          ),
          PortfolioLabelAndLink(
            label: 'Play Store',
            icon: Icons.android,
            link: 'https://play.google.com/store/apps/details?id=com.saifymatteo.mkr_flutter',
          ),
        ],
        media: [
          PortfolioMedia(
            label: 'Home Page',
            image: AppAssets.portfolios.myKampusRadio.mkrHome.provider(),
          ),
          PortfolioMedia(
            label: 'Side Navigation',
            image: AppAssets.portfolios.myKampusRadio.mkrSidePanel.provider(),
          ),
          PortfolioMedia(
            label: 'Mobile Home Page',
            image: AppAssets.portfolios.myKampusRadio.mkrHomeMobile.provider(),
          ),
          PortfolioMedia(
            label: 'Mobile Side Navigation',
            image: AppAssets.portfolios.myKampusRadio.mkrSidePanelMobile
                .provider(),
          ),
        ],
      );
}
