// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

// To configure PowerBI component see
// https://github.com/Cosmo-Tech/azure-sample-webapp/blob/main/doc/powerBI.md
import { POWER_BI_FIELD_ENUM, PowerBIReportEmbedSimpleFilter } from '@cosmotech/azure';

// Power BI information
export const POWER_BI_WORKSPACE_ID = 'f7587274-3bcc-4834-9fe2-27da17ba5d47';

// Power BI embedding mode
export const USE_POWER_BI_WITH_USER_CREDENTIALS = false;
export const SCENARIO_VIEW_IFRAME_DISPLAY_RATIO = 1580 / 350;
export const DASHBOARDS_VIEW_IFRAME_DISPLAY_RATIO = 1280 / 700;

// Dashboards configuration
// For further information about settings or filters see:
// https://github.com/microsoft/powerbi-client-react
// based on
// https://github.com/microsoft/PowerBI-JavaScript
// using
// https://github.com/microsoft/powerbi-models

export const SCENARIO_DASHBOARD_CONFIG = [
  {
    title: {
      en: 'Scenario dashboard',
      fr: 'Rapport du scenario',
    },
    reportId: '27df322b-a230-4041-8e8c-734c8dc8b550',
    settings: {
      navContentPaneEnabled: false,
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
    },
    dynamicFilters: [
      new PowerBIReportEmbedSimpleFilter(
        'GetScenarios',
        'LastSimulationRun',
        POWER_BI_FIELD_ENUM.SCENARIO_CSM_SIMULATION_RUN
      ),
    ],
    pageName: {
      en: 'ReportSectionf0bd28f6841925a40020',
      fr: 'ReportSectionf0bd28f6841925a40020',
    },
  },
];

export const DASHBOARDS_LIST_CONFIG = [
  {
    title: {
      en: 'Scorecard',
      fr: 'Tableau de bord',
    },
    reportId: 'd2f6987c-2bcf-4351-b939-ffb306964b10',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSection007766d808b40ee0e2aa',
      fr: 'ReportSection007766d808b40ee0e2aa',
    },
  },
  {
    title: {
      en: 'Detailed indicators',
      fr: 'Indicateurs détaillés',
    },
    reportId: 'e064b3b0-32d5-4a54-923c-434aba6c0f21',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSection',
      fr: 'ReportSection',
    },
  },
  {
    title: {
      en: 'Network Design',
      fr: 'Carte',
    },
    reportId: 'f923d18d-dfde-40c3-a8a6-04cc757d3fa2',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSection',
      fr: 'ReportSection',
    },
  },
  {
    title: {
      en: 'Uncertainty analysis',
      fr: "Analyse d'incertitude",
    },
    reportId: 'dd25f002-2685-4a16-8d7a-bf76f28623c7',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSectionf4029cb5f314a5f3a6c3',
      fr: 'ReportSectionf4029cb5f314a5f3a6c3',
    },
  },
  {
    title: {
      en: 'Sensitivity Analysis',
      fr: 'Analyse de sensibilité',
    },
    reportId: '6630c31f-3446-4cf3-a1dc-71845a9041b9',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSection',
      fr: 'ReportSection',
    },
  },
  {
    title: {
      en: 'S&OP',
      fr: 'S&OP',
    },
    reportId: '094bae60-7384-4aee-bb05-8e983f55eba3',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSectioncabed0cbfbdf3ab3eeef',
      fr: 'ReportSectioncabed0cbfbdf3ab3eeef',
    },
  },
  {
    title: {
      en: 'Bottleneck identification',
      fr: "Identification des goulots d'étranglement",
    },
    reportId: '204d1351-7483-4137-8ccb-ba01e398f50a',
    settings: {
      navContentPaneEnabled: false,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSection',
      fr: 'ReportSection',
    },
  },
  {
    title: {
      en: 'Input data',
      fr: "Données d'entrée",
    },
    reportId: '82af5333-400f-4d18-bb64-cd41e8f9ef9d',
    settings: {
      navContentPaneEnabled: true,
      panes: {
        filters: {
          expanded: true,
          visible: true,
        },
      },
    },
    pageName: {
      en: 'ReportSection3fe7d3fa163e8d89c07f',
      fr: 'ReportSection3fe7d3fa163e8d89c07f',
    },
  },
];
