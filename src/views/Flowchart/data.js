// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import axios from 'axios';
import {
  AZURE_FUNCTION_FLOWCHART_HEADERS,
  AZURE_FUNCTION_FLOWCHART_URL,
  ORGANIZATION_ID,
  WORKSPACE_ID,
} from '../../config/AppInstance';
import { Auth } from '@cosmotech/core';

const _formatLabelWithNewlines = (label) => label?.replace(/[_|\s]/g, '\n') || '';

const _getResourceForOperation = (elements, operationId) => {
  if (operationId && elements.contains.length > 0) {
    for (const contains of elements.contains) {
      if (contains.target === operationId) {
        return contains.source;
      }
    }
  }
  return null;
};

const _forgeCytoscapeNodeData = (nodeData, classes, parent = undefined) => {
  const cytoscapeNodeData = {
    group: 'nodes',
    data: { ...nodeData, label: _formatLabelWithNewlines(nodeData.Label), parent: parent },
    classes: classes,
  };
  return cytoscapeNodeData;
};

export const processGraphElements = (elements) => {
  if (!('Stock' in elements)) {
    return [];
  }
  let graphElements = [];

  // Stock elements
  const stocks = elements.Stock.map((stock) => _forgeCytoscapeNodeData(stock, ['Stock', stock.PlantName]));
  graphElements = graphElements.concat(stocks);

  // ProductionOperation elements
  if ('ProductionOperation' in elements) {
    const resourcesChildrenCount = {};
    for (const prodOperation of elements.ProductionOperation) {
      const resourceName = _getResourceForOperation(elements, prodOperation.id);
      if (resourceName && resourcesChildrenCount[resourceName] === undefined) {
        resourcesChildrenCount[resourceName] = 1;
      } else {
        resourcesChildrenCount[resourceName]++;
      }
      const nodeClasses = ['ProductionOperation', prodOperation.PlantName, resourceName];
      graphElements.push(_forgeCytoscapeNodeData(prodOperation, nodeClasses, resourceName));
    }
    // Resources compounds
    if ('ProductionResource' in elements) {
      for (const resource of elements.ProductionResource) {
        graphElements.push({
          group: 'nodes',
          data: resource,
          pannable: true,
          locked: true,
          selectable: true,
          grabbable: false,
          classes: ['Resource'],
        });
      }
    }
  }

  const edgesTypes = ['input', 'output', 'Transport'];
  for (const edgeType of edgesTypes) {
    if (!(edgeType in elements)) {
      console.warn(`Unknown edge type "${edgeType}" in graph elements`);
      continue;
    }
    const newElements = elements[edgeType].map((el) => ({
      group: 'edges',
      data: el,
      selectable: true,
    }));
    graphElements = graphElements.concat(newElements);
  }
  return graphElements;
};

export async function fetchData(scenarioId) {
  const tokens = await Auth.acquireTokens();
  const headers = { ...AZURE_FUNCTION_FLOWCHART_HEADERS };
  if (tokens?.accessToken) {
    headers.common = {};
    headers.common.Authorization = 'Bearer ' + tokens.accessToken;
  }
  return await axios({
    method: 'post',
    url: AZURE_FUNCTION_FLOWCHART_URL,
    headers: headers,
    params: {
      'organization-id': ORGANIZATION_ID,
      'workspace-id': WORKSPACE_ID,
      'scenario-id': scenarioId,
    },
  });
}
