// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

// You can define here the input components factories mapping for the custom varTypes of your solution
// See ../generic/FactoriesMapping.js for some examples
import { DATASET_ID_VARTYPE } from '../../../services/config/ApiConstants';
import { AzureFunctionTableFactory } from './AzureFunctionTableFactory';

export const CUSTOM_VAR_TYPES_FACTORIES_MAPPING = {
  // myVarType: myInputFactory
  [DATASET_ID_VARTYPE + '-AZURETABLE']: AzureFunctionTableFactory,
};
