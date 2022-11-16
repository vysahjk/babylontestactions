import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PermissionsGate } from '../../../components';
import { BehaviorConfiguration } from '../../../components/Supplychain/tabs';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

export const ModelBehaviorParameterTab = ({ parametersGroupData, parametersState, setParametersState, context }) => {
  const { t } = useTranslation();

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

  const actualizeShipments = parametersState.actualize_shipments;
  const setActualizeShipments = (newValue) => {
    setParametersState({
      ...parametersState,
      actualize_shipments: newValue,
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
        actualizeShipments={actualizeShipments}
        setActualizeShipments={setActualizeShipments}
        batchSize={batchSize}
        setBatchSize={setBatchSize}
        financialCost={financialCost}
        setFinancialCost={setFinancialCost}
        stockDispatch={stockDispatch}
        setStockDispatch={setStockDispatch}
        editMode={context.editMode}
      />
    </PermissionsGate>
  );
};

ModelBehaviorParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
