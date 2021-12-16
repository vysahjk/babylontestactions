// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, Typography, Zoom } from '@material-ui/core';
import { BasicEnumInput, BasicNumberInput, BasicToggleInput } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';

const BehaviorConfiguration = ({
  manageBacklog,
  setManageBacklog,
  emptyObsoleteStock,
  setEmptyObsoleteStock,
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

  const stockDispatchEnumValues = [
    {
      key: 'AllowRetention',
      value: t(
        'genericcomponent.text.scenario.parameters.behavior.stock_dispatch.allow_retention',
        'flow_mode.allow_retention'
      ),
    },
    {
      key: 'DispatchAll',
      value: t(
        'genericcomponent.text.scenario.parameters.behavior.stock_dispatch.dispatch_all',
        'flow_mode.dispatch_all'
      ),
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
          <Typography>
            {t('genericcomponent.text.scenario.parameters.behavior.batch_size.title', 'batch_size.title')}
          </Typography>
          <Tooltip
            title={t('genericcomponent.text.scenario.parameters.behavior.batch_size.tooltip', 'batch_size.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </Tooltip>
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
          <Typography>
            {t('genericcomponent.text.scenario.parameters.behavior.financial_cost.title', 'financial_cost.title')}
          </Typography>
          <Tooltip
            title={t(
              'genericcomponent.text.scenario.parameters.behavior.financial_cost.tooltip',
              'financial_cost.tooltip'
            )}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </Tooltip>
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
          <Typography>
            {t('genericcomponent.text.scenario.parameters.behavior.manage_backlog.title', 'manage_backlog.title')}
          </Typography>
          <Tooltip
            title={t(
              'genericcomponent.text.scenario.parameters.behavior.manage_backlog.tooltip',
              'manage_backlog.tooltip'
            )}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </Tooltip>
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
          <Typography>
            {t('genericcomponent.text.scenario.parameters.behavior.obsolete_stock.title', 'obsolete_stock.title')}
          </Typography>
          <Tooltip
            title={t(
              'genericcomponent.text.scenario.parameters.behavior.obsolete_stock.tooltip',
              'obsolete_stock.tooltip'
            )}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </Tooltip>
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
          <Typography>
            {t('genericcomponent.text.scenario.parameters.behavior.stock_dispatch.title', 'flow_mode.title')}
          </Typography>
          <Tooltip
            title={t('genericcomponent.text.scenario.parameters.behavior.stock_dispatch.tooltip', 'flow_mode.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicEnumInput
            label=""
            changeEnumField={setStockDispatch}
            textFieldProps={stockDispatchProps}
            value={stockDispatch}
            enumValues={stockDispatchEnumValues}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

BehaviorConfiguration.propTypes = {
  manageBacklog: PropTypes.bool.isRequired,
  setManageBacklog: PropTypes.func.isRequired,
  emptyObsoleteStock: PropTypes.bool.isRequired,
  setEmptyObsoleteStock: PropTypes.func.isRequired,
  batchSize: PropTypes.number.isRequired,
  setBatchSize: PropTypes.func.isRequired,
  financialCost: PropTypes.number.isRequired,
  setFinancialCost: PropTypes.func.isRequired,
  stockDispatch: PropTypes.string.isRequired,
  setStockDispatch: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default BehaviorConfiguration;
