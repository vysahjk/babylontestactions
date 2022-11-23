// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const DATA_SOURCE = {
  type: 'adt',
  functionUrl: 'https://supplychain-dataset-download.azurewebsites.net/api/ScenarioDownload',
  functionKey: 'eWwFDboF385Nmgica4OJHmHRrrC2UOa7c4Zq4BhhRnyoapZl0aBRng==',
};

const NODE_SELECTED_BLACKEN_RATIO = 0.1;
const COSMO_BLUE = '#466282';
const NODE_STOCK_COLOR = '#C13700';
const NODE_PROD_OPERATION_COLOR = '#005A31';

// Styles details
const DEFAULT_PROD_OPERATION_STYLE = {
  'background-color': NODE_PROD_OPERATION_COLOR,
  shape: 'ellipse',
};

const DEFAULT_STOCK_STYLE = {
  'background-blacken': NODE_SELECTED_BLACKEN_RATIO,
  'background-color': NODE_STOCK_COLOR,
  shape: 'polygon',
  'shape-polygon-points': [-1, -1, 1, -1, 0, 1],
};

const DATA_CONTENT = {
  compounds: {
    contains: {},
  },
  edges: {
    input: {},
    output: {},
    Transport: {},
  },
  nodes: {
    ProductionOperation: {
      style: DEFAULT_PROD_OPERATION_STYLE,
    },
    ProductionResource: {
      style: {
        shape: 'rectangle',
        'background-color': COSMO_BLUE,
        'background-opacity': 0.2,
        'border-width': 0,
        label: '',
      },
    },
    Stock: {
      style: DEFAULT_STOCK_STYLE,
    },
  },
};

// Note: "module.exports" style is necessary to be able to read this file from nodejs, when building the webapp
// (imported in config-overrides.js file to add a custom connect-src in CSP rules)

module.exports = { dataSource: DATA_SOURCE, dataContent: DATA_CONTENT };
