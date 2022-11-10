// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, Typography, Zoom, withStyles } from '@material-ui/core';
import { BasicEnumInput, BasicNumberInput, BasicToggleInput } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';

const StyledTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
  },
}))(Tooltip);

const BehaviorConfiguration = ({
  manageBacklog,
  setManageBacklog,
  emptyObsoleteStock,
  setEmptyObsoleteStock,
  actualizeShipments,
  setActualizeShipments,
  batchSize,
  setBatchSize,
  financialCost,
  setFinancialCost,
  stockDispatch,
  setStockDispatch,
  editMode,
}) => {
  const { t } = useTranslation();

  function isTrue(obj) {
    if (obj === 'true') {
      return true;
    }
    if (obj === 'false') {
      return false;
    }
    return !!obj;
  }

  const manageBacklogProps = {
    disabled: !editMode,
    id: 'manage-backlog-input-id',
  };

  const emptyObsoleteStockProps = {
    disabled: !editMode,
    id: 'empty-obsolete-stock-input-id',
  };

  const actualizeShipmentsProps = {
    disabled: !editMode,
    id: 'actualize-shipments-input-id',
  };

  const batchSizeProps = {
    disabled: !editMode,
    id: 'batch-size-input-id',
  };

  const batchSizeLimitsProps = {
    min: 0.0,
    max: 1000000000.0,
  };

  const financialCostProps = {
    disabled: !editMode,
    id: 'financial-cost-input-id',
  };

  const financialCostLimitsProps = {
    min: 0.0,
    max: 1.0,
  };

  const enumDisplay = (
    labelKey,
    labelPlaceholder,
    tooltipKey,
    tooltipPlaceholder,
    changeFunction,
    textProp,
    currentValue,
    enumValues
  ) => {
    const enumTooltipValue = enumValues.find((elem) => elem.key === currentValue).tooltip;
    return (
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(labelKey, labelPlaceholder)}</Typography>
          <StyledTooltip title={t(tooltipKey, tooltipPlaceholder)} placement="top-end" TransitionComponent={Zoom}>
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid container item xs={4}>
          <StyledTooltip title={enumTooltipValue} placement="right" TransitionComponent={Zoom} arrow>
            <Grid>
              <BasicEnumInput
                label=""
                changeEnumField={changeFunction}
                textFieldProps={textProp}
                value={currentValue}
                enumValues={enumValues}
              />
            </Grid>
          </StyledTooltip>
        </Grid>
      </Grid>
    );
  };

  const baseTranslation = 'genericcomponent.text.scenario.parameters.behavior.';

  const stockDispatchEnumValues = [
    {
      key: 'AllowRetention',
      value: t(baseTranslation + 'stock_dispatch.allow_retention.value', 'stock_dispatch.allow_retention.value'),
      tooltip: t(baseTranslation + 'stock_dispatch.allow_retention.tooltip', 'stock_dispatch.allow_retention.tooltip'),
    },
    {
      key: 'DispatchAll',
      value: t(baseTranslation + 'stock_dispatch.dispatch_all.value', 'stock_dispatch.dispatch_all.value'),
      tooltip: t(baseTranslation + 'stock_dispatch.dispatch_all.tooltip', 'stock_dispatch.dispatch_all.tooltip'),
    },
  ];

  const stockDispatchProps = {
    disabled: !editMode,
    id: 'part-retention-input-id',
  };

  return (
    <Grid container>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'batch_size.title', 'batch_size.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'batch_size.tooltip', 'batch_size.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicNumberInput
            label=""
            changeNumberField={setBatchSize}
            textFieldProps={batchSizeProps}
            inputProps={batchSizeLimitsProps}
            value={batchSize}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'financial_cost.title', 'financial_cost.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'financial_cost.tooltip', 'financial_cost.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicNumberInput
            label=""
            changeNumberField={setFinancialCost}
            textFieldProps={financialCostProps}
            inputProps={financialCostLimitsProps}
            value={financialCost}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'manage_backlog.title', 'manage_backlog.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'manage_backlog.tooltip', 'manage_backlog.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicToggleInput
            label=""
            changeSwitchType={setManageBacklog}
            switchProps={manageBacklogProps}
            value={isTrue(manageBacklog)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'obsolete_stock.title', 'obsolete_stock.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'obsolete_stock.tooltip', 'obsolete_stock.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicToggleInput
            label=""
            changeSwitchType={setEmptyObsoleteStock}
            switchProps={emptyObsoleteStockProps}
            value={isTrue(emptyObsoleteStock)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'actualize_shipments.title', 'actualize_shipments.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'actualize_shipments.tooltip', 'actualize_shipments.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicToggleInput
            label=""
            changeSwitchType={setActualizeShipments}
            switchProps={actualizeShipmentsProps}
            value={isTrue(actualizeShipments)}
          />
        </Grid>
      </Grid>
      {enumDisplay(
        baseTranslation + 'stock_dispatch.title',
        'stock_dispatch.label',
        baseTranslation + 'stock_dispatch.tooltip',
        'stock_dispatch.tooltip',
        setStockDispatch,
        stockDispatchProps,
        stockDispatch,
        stockDispatchEnumValues
      )}
    </Grid>
  );
};

BehaviorConfiguration.propTypes = {
  manageBacklog: PropTypes.bool.isRequired,
  setManageBacklog: PropTypes.func.isRequired,
  emptyObsoleteStock: PropTypes.bool.isRequired,
  setEmptyObsoleteStock: PropTypes.func.isRequired,
  actualizeShipments: PropTypes.bool.isRequired,
  setActualizeShipments: PropTypes.func.isRequired,
  batchSize: PropTypes.number.isRequired,
  setBatchSize: PropTypes.func.isRequired,
  financialCost: PropTypes.number.isRequired,
  setFinancialCost: PropTypes.func.isRequired,
  stockDispatch: PropTypes.string.isRequired,
  setStockDispatch: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default BehaviorConfiguration;
