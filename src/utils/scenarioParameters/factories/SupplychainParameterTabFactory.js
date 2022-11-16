// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { ScenarioParametersTabFactory } from './ScenarioParametersTabFactory';

const create = (
  t,
  datasets,
  parametersGroupData,
  parametersState,
  setParametersState,
  editMode,
  workspaceId,
  currentScenario
) => {
  // Fallback to generic generation
  return ScenarioParametersTabFactory.create(
    t,
    datasets,
    parametersGroupData,
    parametersState,
    setParametersState,
    editMode,
    currentScenario
  );
};

export const SupplychainParametersTabFactory = {
  create,
};
