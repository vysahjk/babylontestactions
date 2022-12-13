import React from 'react';
import PropTypes from 'prop-types';
import { PermissionsGate } from '../../../components';
import { SensitivityAnalysisConfiguration } from '../../../components/Supplychain/tabs';
import { t } from 'i18next';

export const SensitivityAnalysisParameterTab = ({
  parametersGroupData,
  parametersState,
  setParametersState,
  context,
}) => {
  const noPermissionsPlaceHolder = (t) => {
    return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
  };
  const setSensitivityAnalysisSensitiveParameter = (newValue) => {
    setParametersState({
      ...parametersState,
      sensitive_parameter: newValue,
    });
  };

  const sensitivityAnalysisChange = parametersState.change;
  const setSensitivityAnalysisChange = (newValue) => {
    setParametersState({
      ...parametersState,
      change: newValue,
    });
  };

  const sensitivityAnalysisVariation = parametersState.variation;
  const setSensitivityAnalysisVariation = (newValue) => {
    setParametersState({
      ...parametersState,
      variation: newValue,
    });
  };

  const sensitivityAnalysisTimeInterval = parametersState.timeinterval;
  const setSensitivityAnalysisTimeInterval = (newValue) => {
    setParametersState({
      ...parametersState,
      timeinterval: newValue,
    });
  };

  const sensitivityAnalysisInitialTimeStep = parametersState.initialtimestep;
  const setSensitivityAnalysisInitialTimeStep = (newValue) => {
    setParametersState({
      ...parametersState,
      initialtimestep: newValue,
    });
  };

  const sensitivityAnalysisFinalTimeStep = parametersState.finaltimestep;
  const setSensitivityAnalysisFinalTimeStep = (newValue) => {
    setParametersState({
      ...parametersState,
      finaltimestep: newValue,
    });
  };

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <SensitivityAnalysisConfiguration
        sensitivityAnalysisSensitiveParameter={parametersState.sensitive_parameter}
        setSensitivityAnalysisSensitiveParameter={setSensitivityAnalysisSensitiveParameter}
        sensitivityAnalysisChange={sensitivityAnalysisChange}
        setSensitivityAnalysisChange={setSensitivityAnalysisChange}
        sensitivityAnalysisVariation={sensitivityAnalysisVariation}
        setSensitivityAnalysisVariation={setSensitivityAnalysisVariation}
        sensitivityAnalysisTimeInterval={sensitivityAnalysisTimeInterval}
        setSensitivityAnalysisTimeInterval={setSensitivityAnalysisTimeInterval}
        sensitivityAnalysisInitialTimeStep={sensitivityAnalysisInitialTimeStep}
        setSensitivityAnalysisInitialTimeStep={setSensitivityAnalysisInitialTimeStep}
        sensitivityAnalysisFinalTimeStep={sensitivityAnalysisFinalTimeStep}
        setSensitivityAnalysisFinalTimeStep={setSensitivityAnalysisFinalTimeStep}
        editMode={context.editMode}
      />
    </PermissionsGate>
  );
};

SensitivityAnalysisParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
