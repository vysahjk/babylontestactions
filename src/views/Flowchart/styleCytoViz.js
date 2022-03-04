// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import theme from '../../theme/';

// Labels
const NODE_LABEL_SIZE = '11';
const NODE_LABEL_MAX_WIDTH = '90px';
// Icons
const NODE_ICON_SIZE = '28';
const NODE_SELECTED_ICON_SIZE = '34';
const NODE_SELECTED_BLACKEN_RATIO = 0.1;
// Colors
const COSMO_BLUE = '#466282';
const NODE_STOCK_COLOR = '#C13700';
const NODE_PROD_OPERATION_COLOR = '#005A31';

// Styles details
const DEFAULT_NODE_STYLE = {
  width: NODE_ICON_SIZE,
  height: NODE_ICON_SIZE,
  'background-blacken': NODE_SELECTED_BLACKEN_RATIO,
  'font-size': NODE_LABEL_SIZE,
  'text-max-width': NODE_LABEL_MAX_WIDTH,
  'text-wrap': 'wrap',
  'min-zoomed-font-size': 5,
  color: theme.palette.primary.contrastText,
  label: 'data(label)',
};

const NODE_SELECTED_STYLE = {
  width: NODE_SELECTED_ICON_SIZE,
  height: NODE_SELECTED_ICON_SIZE,
  'background-blacken': -NODE_SELECTED_BLACKEN_RATIO,
};

const DEFAULT_STOCK_STYLE = {
  ...DEFAULT_NODE_STYLE,
  'background-color': NODE_STOCK_COLOR,
  shape: 'polygon',
  'shape-polygon-points': [-1, -1, 1, -1, 0, 1],
};

const SELECTED_STOCK_STYLE = {
  ...DEFAULT_STOCK_STYLE,
  ...NODE_SELECTED_STYLE,
};

const DEFAULT_PROD_OPERATION_STYLE = {
  ...DEFAULT_NODE_STYLE,
  'background-color': NODE_PROD_OPERATION_COLOR,
  shape: 'ellipse',
};

const SELECTED_PROD_OPERATION_STYLE = {
  ...DEFAULT_PROD_OPERATION_STYLE,
  ...NODE_SELECTED_STYLE,
};

// Cytoscape stylesheet
export default [
  {
    selector: 'node.Stock',
    style: DEFAULT_STOCK_STYLE,
  },
  {
    selector: 'node.Stock:selected',
    style: SELECTED_STOCK_STYLE,
  },
  {
    selector: 'node.ProductionOperation',
    style: DEFAULT_PROD_OPERATION_STYLE,
  },
  {
    selector: 'node.ProductionOperation:selected',
    style: SELECTED_PROD_OPERATION_STYLE,
  },
  {
    selector: 'node.Resource',
    css: {
      shape: 'rectangle',
      'background-color': COSMO_BLUE,
      'background-opacity': 0.2,
      'border-width': 0,
    },
  },
];
