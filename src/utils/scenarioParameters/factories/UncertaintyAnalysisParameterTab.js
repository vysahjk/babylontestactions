import React from 'react';
import PropTypes from 'prop-types';
import { PermissionsGate } from '../../../components';
import { UncertaintyConfiguration, TransportUncertaintyConfiguration } from '../../../components/Supplychain/tabs';
import { t } from 'i18next';

export const UncertaintyAnalysisParameterTab = ({
  parametersGroupData,
  parametersState,
  setParametersState,
  context,
}) => {
  const noPermissionsPlaceHolder = (t) => {
    return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
  };

  const setUncertaintiesDistribution = (newValue) => {
    setParametersState({
      ...parametersState,
      uncertainties_probability_distribution: newValue,
    });
  };
  const setTransportUncertaintiesDistribution = (newValue) => {
    setParametersState({
      ...parametersState,
      transport_uncertainty_distribution: newValue,
    });
  };

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <UncertaintyConfiguration
        uncertaintiesDistribution={parametersState.uncertainties_probability_distribution}
        setUncertaintiesDistribution={setUncertaintiesDistribution}
        editMode={context.editMode}
      />

      <TransportUncertaintyConfiguration
        transportUncertaintiesDistribution={parametersState.transport_uncertainty_distribution}
        setTransportUncertaintiesDistribution={setTransportUncertaintiesDistribution}
        editMode={context.editMode}
      />
    </PermissionsGate>
  );
};

UncertaintyAnalysisParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
