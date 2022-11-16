import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PermissionsGate } from '../../../components';
import { FlowManagementPoliciesConfiguration } from '../../../components/Supplychain/tabs';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

export const FlowManagementPoliciesParameterTab = ({
  parametersGroupData,
  parametersState,
  setParametersState,
  context,
}) => {
  const { t } = useTranslation();
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
        editMode={context.editMode}
      />
    </PermissionsGate>
  );
};

FlowManagementPoliciesParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
