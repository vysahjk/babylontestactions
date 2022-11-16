import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PermissionsGate } from '../../../components';
import { TimeConfiguration } from '../../../components/Supplychain/tabs';
import { getDateAtMidnight } from '../../DateUtils';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

export const SimulationParameterTab = ({ parametersGroupData, parametersState, setParametersState, context }) => {
  const { t } = useTranslation();
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
      <>
        <TimeConfiguration
          startDate={startDate}
          endDate={endDate}
          simulationGranularity={simulationGranularity}
          setStartDate={setStartDateAtMidnight}
          setEndDate={setEndDateAtMidnight}
          setSimulationGranularity={setSimulationGranularity}
          editMode={context.editMode}
        />
      </>
    </PermissionsGate>
  );
};

SimulationParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
