// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import {
  // FlowManagementPoliciesParameterTab,
  // SimulationParameterTab,
  MassActionLeverParameterTab,
  // ModelBehaviorParameterTab,
  // OptimizationParameterTab,
  // UncertaintyAnalysisParameterTab,
  // SensitivityAnalysisParameterTab,
} from '../factories';

// You can define here the tab components mapping for the custom parameters group of your solution
export const CUSTOM_PARAMETERS_GROUPS_COMPONENTS_MAPPING = {
  // simulation: SimulationParameterTab,
  mass_action_lever: MassActionLeverParameterTab,
  // optimization: OptimizationParameterTab,
  // model_behavior: ModelBehaviorParameterTab,
  // flow_management_policies: FlowManagementPoliciesParameterTab,
  // uncertainty_analysis: UncertaintyAnalysisParameterTab,
  // sensitivity_analysis: SensitivityAnalysisParameterTab,
};
