import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PermissionsGate } from '../../../components';
import { SensitivityAnalysisConfiguration } from '../../../components/Supplychain/tabs';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

export const SensitivityAnalysisParameterTab = ({
  parametersGroupData,
  parametersState,
  setParametersState,
  context,
}) => {
  const { t } = useTranslation();
  const sensitivityAnalysisSensitiveParameter = parametersState.sensitive_parameter;
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

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <SensitivityAnalysisConfiguration
        sensitivityAnalysisSensitiveParameter={sensitivityAnalysisSensitiveParameter}
        setSensitivityAnalysisSensitiveParameter={setSensitivityAnalysisSensitiveParameter}
        sensitivityAnalysisChange={sensitivityAnalysisChange}
        setSensitivityAnalysisChange={setSensitivityAnalysisChange}
        sensitivityAnalysisVariation={sensitivityAnalysisVariation}
        setSensitivityAnalysisVariation={setSensitivityAnalysisVariation}
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
