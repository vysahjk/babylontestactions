// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getDateAtMidnight } from '../utils/DateUtils';
// Time configuration parameters
const getDefaultStartDate = () => getDateAtMidnight(new Date());
const getDefaultEndDate = () => getDefaultStartDate();
// Use the PARAMETERS dict below to override or add information to the scenario parameters defined in your solution
// description, such as:
//  - a default value for each scenario parameter on scenario creation
//  - lists of possible values for "enum" parameters
//  - translation labels
const PARAMETERS = {
  start_date: {
    defaultValue: getDefaultStartDate(),
  },
  end_date: {
    defaultValue: getDefaultEndDate(),
  },
  simulation_granularity: {
    defaultValue: 'day',
  },
  optimization_objective: {
    defaultValue: 'ServiceLevelMaximization',
  },
  manage_backlog_quantities: {
    defaultValue: false,
  },
  empty_obsolete_stocks: {
    defaultValue: false,
  },
  actualize_shipments: {
    defaultValue: false,
  },
  batch_size: {
    defaultValue: 0.0,
  },
  financial_cost_of_stocks: {
    defaultValue: 0.0,
  },
  uncertainties_probability_distribution: {
    defaultValue: 'Gaussian',
  },
  transport_uncertainty_distribution: {
    defaultValue: 'discreteuniform',
  },
  intermediary_stock_dispatch: {
    defaultValue: 'DispatchAll',
  },
  mass_lever_excel_file: {
    connectorId: 'c-d7e5p9o0kjn9',
    defaultFileTypeFilter: '.xlsx,.zip',
  },
  stock_policy: {
    defaultValue: 'None',
  },
  sourcing_policy: {
    defaultValue: 'Equidistribution',
  },
  stock_dispatch_policy: {
    defaultValue: 'None',
  },
  production_policy: {
    defaultValue: 'Equidistribution',
  },
  demand_plan: {
    connectorId: 'c-d7e5p9o0kjn9',
    defaultFileTypeFilter: '.csv',
    subType: 'AZURETABLE',
    azureFunction: 'https://supplychain-dataset-download.azurewebsites.net/api/DemandsPlan',
    azureFunctionHeaders: { 'x-functions-key': 'eWwFDboF385Nmgica4OJHmHRrrC2UOa7c4Zq4BhhRnyoapZl0aBRng==' },
  },
  transport_duration: {
    connectorId: 'c-d7e5p9o0kjn9',
    defaultFileTypeFilter: '.csv',
    subType: 'AZURETABLE',
    azureFunction: 'https://supplychain-dataset-download.azurewebsites.net/api/TransportDuration',
    azureFunctionHeaders: { 'x-functions-key': 'eWwFDboF385Nmgica4OJHmHRrrC2UOa7c4Zq4BhhRnyoapZl0aBRng==' },
  },
  production_resource_opening_time: {
    connectorId: 'c-d7e5p9o0kjn9',
    defaultFileTypeFilter: '.csv',
    subType: 'AZURETABLE',
    azureFunction: 'https://supplychain-dataset-download.azurewebsites.net/api/ResourceOpeningTime',
    azureFunctionHeaders: { 'x-functions-key': 'eWwFDboF385Nmgica4OJHmHRrrC2UOa7c4Zq4BhhRnyoapZl0aBRng==' },
  },
  sensitive_parameter: {
    defaultValue: 'Machine Opening Time',
  },
  change: {
    defaultValue: 'Relative',
  },
  variation: {
    defaultValue: 0.0,
  },
};

// Use the PARAMETERS_GROUPS dict below to override or add information to the parameters groups defined in your solution
// description, such as:
//  - translation labels
//  - list and order of the parameters of a group
// You can also create new groups that were not defined in the solution description: in this case don't forget to assign
// these parameters groups to a run template in the RUN_TEMPLATES dict
const PARAMETERS_GROUPS = {};

// Use RUN_TEMPLATES dict below to override information of the run templates defined in your solution description, such
// as:
//  - list and order of the parameters group to display for this run template
const RUN_TEMPLATES = {};

export const SCENARIO_PARAMETERS_CONFIG = {
  parameters: PARAMETERS,
  parametersGroups: PARAMETERS_GROUPS,
  runTemplates: RUN_TEMPLATES,
};
