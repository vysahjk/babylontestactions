import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PermissionsGate } from '../../../components';
import { UncertaintyConfiguration, TransportUncertaintyConfiguration } from '../../../components/Supplychain/tabs';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

export const UncertaintyAnalysisParameterTab = ({
  parametersGroupData,
  parametersState,
  setParametersState,
  context,
}) => {
  const { t } = useTranslation();
  const uncertaintiesDistribution = parametersState.uncertainties_probability_distribution;
  const setUncertaintiesDistribution = (newValue) => {
    setParametersState({
      ...parametersState,
      uncertainties_probability_distribution: newValue,
    });
  };

  const transportUncertaintiesDistribution = parametersState.transport_uncertainty_distribution;
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
        uncertaintiesDistribution={uncertaintiesDistribution}
        setUncertaintiesDistribution={setUncertaintiesDistribution}
        editMode={context.editMode}
      />

      <TransportUncertaintyConfiguration
        transportUncertaintiesDistribution={transportUncertaintiesDistribution}
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
