// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { ScenarioParametersTabFactory } from './ScenarioParametersTabFactory';
import { PermissionsGate } from '../../../components';
import {
  BehaviorConfiguration,
  FileUpload,
  FlowManagementPoliciesConfiguration,
  OptimizationConfiguration,
  TimeConfiguration,
  UncertaintyConfiguration,
} from '../../../components/Supplychain/tabs';
import { getDateAtMidnight } from '../../DateUtils';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

const SimulationParameterTab = (t, datasets, parametersGroupData, parametersState, setParametersState, editMode) => {
  const startDate = parametersState.start_date;
  const endDate = parametersState.end_date;
  const simulationGranularity = parametersState.simulation_granularity;

  const setStartDateAtMidnight = (newValue) => {
    setParametersState({
      ...parametersState,
      start_date: getDateAtMidnight(newValue),
    });
  };

  const setEndDateAtMidnight = (newValue) => {
    setParametersState({
      ...parametersState,
      end_date: getDateAtMidnight(newValue),
    });
  };

  const setSimulationGranularity = (newValue) => {
    setParametersState({
      ...parametersState,
      simulation_granularity: newValue,
    });
  };

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <TimeConfiguration
        startDate={startDate}
        endDate={endDate}
        simulationGranularity={simulationGranularity}
        setStartDate={setStartDateAtMidnight}
        setEndDate={setEndDateAtMidnight}
        setSimulationGranularity={setSimulationGranularity}
        editMode={editMode}
      />
    </PermissionsGate>
  );
};

const MassActionLeverParameterTab = (
  t,
  datasets,
  parametersGroupData,
  parametersState,
  setParametersState,
  editMode,
  workspaceId,
  currentScenario
) => {
  const file = parametersState.mass_lever_excel_file;
  const setFile = (newValue) => {
    setParametersState({
      ...parametersState,
      mass_lever_excel_file: newValue,
    });
  };
  const datasetId = file.id;
  const acceptedFileTypesToUpload = parametersGroupData.parameters[0].defaultFileTypeFilter;

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <FileUpload
        file={file}
        setFile={setFile}
        datasetId={datasetId}
        acceptedFileTypesToUpload={acceptedFileTypesToUpload}
        editMode={editMode}
        scenario={currentScenario.data}
        workspaceId={workspaceId}
      />
    </PermissionsGate>
  );
};

const OptimizationParameterTab = (t, datasets, parametersGroupData, parametersState, setParametersState, editMode) => {
  const optimizationObjective = parametersState.optimization_objective;
  const setOptimizationObjective = (newValue) => {
    setParametersState({
      ...parametersState,
      optimization_objective: newValue,
    });
  };
  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <OptimizationConfiguration
        optimizationObjective={optimizationObjective}
        setOptimizationObjective={setOptimizationObjective}
        editMode={editMode}
      />
    </PermissionsGate>
  );
};

const UncertaintyAnalysisParameterTab = (
  t,
  datasets,
  parametersGroupData,
  parametersState,
  setParametersState,
  editMode
) => {
  const uncertaintiesDistribution = parametersState.uncertainties_probability_distribution;
  const setUncertaintiesDistribution = (newValue) => {
    setParametersState({
      ...parametersState,
      uncertainties_probability_distribution: newValue,
    });
  };

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <UncertaintyConfiguration
        uncertaintiesDistribution={uncertaintiesDistribution}
        setUncertaintiesDistribution={setUncertaintiesDistribution}
        editMode={editMode}
      />
    </PermissionsGate>
  );
};

const ModelBehaviorParameterTab = (t, datasets, parametersGroupData, parametersState, setParametersState, editMode) => {
  const manageBacklog = parametersState.manage_backlog_quantities;
  const setManageBacklog = (newValue) => {
    setParametersState({
      ...parametersState,
      manage_backlog_quantities: newValue,
    });
  };

  const emptyObsoleteStock = parametersState.empty_obsolete_stocks;
  const setEmptyObsoleteStock = (newValue) => {
    setParametersState({
      ...parametersState,
      empty_obsolete_stocks: newValue,
    });
  };

  const batchSize = parametersState.batch_size;
  const setBatchSize = (newValue) => {
    setParametersState({
      ...parametersState,
      batch_size: newValue,
    });
  };

  const financialCost = parametersState.financial_cost_of_stocks;
  const setFinancialCost = (newValue) => {
    setParametersState({
      ...parametersState,
      financial_cost_of_stocks: newValue,
    });
  };

  const stockDispatch = parametersState.intermediary_stock_dispatch;
  const setStockDispatch = (newValue) => {
    setParametersState({
      ...parametersState,
      intermediary_stock_dispatch: newValue,
    });
  };
  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <BehaviorConfiguration
        manageBacklog={manageBacklog}
        setManageBacklog={setManageBacklog}
        emptyObsoleteStock={emptyObsoleteStock}
        setEmptyObsoleteStock={setEmptyObsoleteStock}
        batchSize={batchSize}
        setBatchSize={setBatchSize}
        financialCost={financialCost}
        setFinancialCost={setFinancialCost}
        stockDispatch={stockDispatch}
        setStockDispatch={setStockDispatch}
        editMode={editMode}
      />
    </PermissionsGate>
  );
};

const FlowManagementPoliciesParameterTab = (
  t,
  datasets,
  parametersGroupData,
  parametersState,
  setParametersState,
  editMode
) => {
  const stockPolicy = parametersState.stock_policy;
  const setStockPolicy = (newValue) => {
    setParametersState({
      ...parametersState,
      stock_policy: newValue,
    });
  };

  const sourcingPolicy = parametersState.sourcing_policy;
  const setSourcingPolicy = (newValue) => {
    setParametersState({
      ...parametersState,
      sourcing_policy: newValue,
    });
  };

  const stockDispatchPolicy = parametersState.stock_dispatch_policy;
  const setStockDispatchPolicy = (newValue) => {
    setParametersState({
      ...parametersState,
      stock_dispatch_policy: newValue,
    });
  };

  const productionPolicy = parametersState.production_policy;
  const setProductionPolicy = (newValue) => {
    setParametersState({
      ...parametersState,
      production_policy: newValue,
    });
  };
  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <FlowManagementPoliciesConfiguration
        stockPolicy={stockPolicy}
        setStockPolicy={setStockPolicy}
        sourcingPolicy={sourcingPolicy}
        setSourcingPolicy={setSourcingPolicy}
        stockDispatchPolicy={stockDispatchPolicy}
        setStockDispatchPolicy={setStockDispatchPolicy}
        productionPolicy={productionPolicy}
        setProductionPolicy={setProductionPolicy}
        editMode={editMode}
      />
    </PermissionsGate>
  );
};

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
  if (parametersGroupData.id === 'simulation') {
    return SimulationParameterTab(t, datasets, parametersGroupData, parametersState, setParametersState, editMode);
  } else if (parametersGroupData.id === 'mass_action_lever') {
    return MassActionLeverParameterTab(
      t,
      datasets,
      parametersGroupData,
      parametersState,
      setParametersState,
      editMode,
      workspaceId,
      currentScenario
    );
  } else if (parametersGroupData.id === 'optimization') {
    return OptimizationParameterTab(t, datasets, parametersGroupData, parametersState, setParametersState, editMode);
  } else if (parametersGroupData.id === 'uncertainty_analysis') {
    return UncertaintyAnalysisParameterTab(
      t,
      datasets,
      parametersGroupData,
      parametersState,
      setParametersState,
      editMode
    );
  } else if (parametersGroupData.id === 'model_behavior') {
    return ModelBehaviorParameterTab(t, datasets, parametersGroupData, parametersState, setParametersState, editMode);
  } else if (parametersGroupData.id === 'flow_management_policies') {
    return FlowManagementPoliciesParameterTab(
      t,
      datasets,
      parametersGroupData,
      parametersState,
      setParametersState,
      editMode
    );
  } else {
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
  }
};

export const SupplychainParametersTabFactory = {
  create,
};
