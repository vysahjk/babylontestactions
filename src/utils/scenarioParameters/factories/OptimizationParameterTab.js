import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PermissionsGate } from '../../../components';
import { OptimizationConfiguration } from '../../../components/Supplychain/tabs';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

export const OptimizationParameterTab = ({ parametersGroupData, parametersState, setParametersState, context }) => {
  const { t } = useTranslation();
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
        editMode={context.editMode}
      />
    </PermissionsGate>
  );
};

OptimizationParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
