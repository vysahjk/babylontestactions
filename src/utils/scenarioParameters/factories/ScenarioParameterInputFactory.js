// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { DATASET_ID_VARTYPE } from '../../../services/config/ApiConstants';
import { CUSTOM_VAR_TYPES_FACTORIES_MAPPING } from '../custom/FactoriesMapping';
import { ConfigUtils } from '../../ConfigUtils';

export const create = (t, datasets, parameterData, parametersState, setParametersState, editMode, currentScenario) => {
  const parameterVarType = ConfigUtils.buildExtendedVarType(parameterData.varType, parameterData.subType);
  let varTypeFactory;

  if (parameterVarType in CUSTOM_VAR_TYPES_FACTORIES_MAPPING) {
    varTypeFactory = CUSTOM_VAR_TYPES_FACTORIES_MAPPING[parameterVarType];
  } else {
    varTypeFactory = CUSTOM_VAR_TYPES_FACTORIES_MAPPING[parameterData.varType];
  }

  if (varTypeFactory === undefined) {
    console.warn('No factory defined for varType ' + parameterVarType);
    return null;
  }
  if (varTypeFactory === null) {
    return null;
  }

  if (parameterVarType.startsWith(DATASET_ID_VARTYPE)) {
    console.log(parameterVarType);
    return varTypeFactory.create(
      t,
      datasets,
      parameterData,
      parametersState,
      setParametersState,
      editMode,
      currentScenario
    );
  }
  return varTypeFactory.create(t, parameterData, parametersState, setParametersState, editMode);
};

export const ScenarioParameterInputFactory = {
  create,
};
