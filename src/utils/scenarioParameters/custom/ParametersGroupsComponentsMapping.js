// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import {
  FlowManagementPoliciesParameterTab,
  SimulationParameterTab,
  MassActionLeverParameterTab,
  ModelBehaviorParameterTab,
  OptimizationParameterTab,
  // SensitivityAnalysisParameterTab,
} from '../factories';

// You can define here the tab components mapping for the custom parameters group of your solution
export const CUSTOM_PARAMETERS_GROUPS_COMPONENTS_MAPPING = {
  // parametersGroupId: CustomScenarioParametersTabComponent,
  // eslint-disable-next-line prettier/prettier
  simulation: SimulationParameterTab,
  mass_action_lever: MassActionLeverParameterTab,
  optimization: OptimizationParameterTab,
  model_behavior: ModelBehaviorParameterTab,
  flow_management_policies: FlowManagementPoliciesParameterTab,
  // sensitivity_analysis: SensitivityAnalysisParameterTab,
};
