// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Tooltip, Zoom, withStyles } from '@material-ui/core';
import { BasicEnumInput } from '@cosmotech/ui';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';

const StyledTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
  },
}))(Tooltip);

const FlowManagementPoliciesConfiguration = ({
  stockPolicy,
  setStockPolicy,
  sourcingPolicy,
  setSourcingPolicy,
  stockDispatchPolicy,
  setStockDispatchPolicy,
  productionPolicy,
  setProductionPolicy,
  editMode,
}) => {
  const { t } = useTranslation();

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
          <Tooltip title={enumTooltipValue} placement="right" TransitionComponent={Zoom} arrow>
            <Grid>
              <BasicEnumInput
                label=""
                changeEnumField={changeFunction}
                textFieldProps={textProp}
                value={currentValue}
                enumValues={enumValues}
              />
            </Grid>
          </Tooltip>
        </Grid>
      </Grid>
    );
  };

  const baseTranslation = 'genericcomponent.text.scenario.parameters.flow_management_policies';

  const stockEnumValues = [
    {
      key: 'None',
      value: t(baseTranslation + '.' + 'stock.none.value', 'stock.none.value'),
      tooltip: t(baseTranslation + '.' + 'stock.none.tooltip', 'stock.none.tooltip'),
    },
    {
      key: 'OrderPointFixedQuantity',
      value: t(baseTranslation + '.' + 'stock.op_fixed.value', 'stock.op_fixed.value'),
      tooltip: t(baseTranslation + '.' + 'stock.op_fixed.tooltip', 'stock.op_fixed.tooltip'),
    },
    {
      key: 'OrderPointVariableQuantity',
      value: t(baseTranslation + '.' + 'stock.op_variable.value', 'stock.op_variable.value'),
      tooltip: t(baseTranslation + '.' + 'stock.op_variable.tooltip', 'stock.op_variable.tooltip'),
    },
    {
      key: 'MakeToForecast',
      value: t(baseTranslation + '.' + 'stock.make_to_forecast.value', 'stock.make_to_forecast.value'),
      tooltip: t(baseTranslation + '.' + 'stock.make_to_forecast.tooltip', 'stock.make_to_forecast.tooltip'),
    },
    {
      key: 'FromDataset',
      value: t(baseTranslation + '.' + 'stock.from_dataset.value', 'stock.from_dataset.value'),
      tooltip: t(baseTranslation + '.' + 'stock.from_dataset.tooltip', 'stock.from_dataset.tooltip'),
    },
  ];

  const sourcingEnumValues = [
    {
      key: 'Equidistribution',
      value: t(baseTranslation + '.' + 'sourcing.equi.value', 'sourcing.equi.value'),
      tooltip: t(baseTranslation + '.' + 'sourcing.equi.tooltip', 'sourcing.equi.tooltip'),
    },
    {
      key: 'HighestStock',
      value: t(baseTranslation + '.' + 'sourcing.highest.value', 'sourcing.highest.value'),
      tooltip: t(baseTranslation + '.' + 'sourcing.highest.tooltip', 'sourcing.highest.tooltip'),
    },
    {
      key: 'HighestPriority',
      value: t(baseTranslation + '.' + 'sourcing.priority.value', 'sourcing.priority.value'),
      tooltip: t(baseTranslation + '.' + 'sourcing.priority.tooltip', 'sourcing.priority.tooltip'),
    },
    {
      key: 'FromDataset',
      value: t(baseTranslation + '.' + 'sourcing.from_dataset.value', 'sourcing.from_dataset.value'),
      tooltip: t(baseTranslation + '.' + 'sourcing.from_dataset.tooltip', 'sourcing.from_dataset.tooltip'),
    },
  ];

  const stockDispatchEnumValues = [
    {
      key: 'None',
      value: t(baseTranslation + '.' + 'stockDispatch.none.value', 'stockDispatch.none.value'),
      tooltip: t(baseTranslation + '.' + 'stockDispatch.none.tooltip', 'stockDispatch.none.tooltip'),
    },
    {
      key: 'Equidistribution',
      value: t(baseTranslation + '.' + 'stockDispatch.equi.value', 'stockDispatch.equi.value'),
      tooltip: t(baseTranslation + '.' + 'stockDispatch.equi.tooltip', 'stockDispatch.equi.tooltip'),
    },
    {
      key: 'GreatestQuantity',
      value: t(baseTranslation + '.' + 'stockDispatch.greatest.value', 'stockDispatch.greatest.value'),
      tooltip: t(baseTranslation + '.' + 'stockDispatch.greatest.tooltip', 'stockDispatch.greatest.tooltip'),
    },
    {
      key: 'SmallestQuantity',
      value: t(baseTranslation + '.' + 'stockDispatch.smallest.value', 'stockDispatch.smallest.value'),
      tooltip: t(baseTranslation + '.' + 'stockDispatch.smallest.tooltip', 'stockDispatch.smallest.tooltip'),
    },
    {
      key: 'HighestPriority',
      value: t(baseTranslation + '.' + 'stockDispatch.priority.value', 'stockDispatch.priority.value'),
      tooltip: t(baseTranslation + '.' + 'stockDispatch.priority.tooltip', 'stockDispatch.priority.tooltip'),
    },
    {
      key: 'FromDataset',
      value: t(baseTranslation + '.' + 'stockDispatch.from_dataset.value', 'stockDispatch.from_dataset.value'),
      tooltip: t(baseTranslation + '.' + 'stockDispatch.from_dataset.tooltip', 'stockDispatch.from_dataset.tooltip'),
    },
  ];

  const productionEnumValues = [
    /* {
      key: 'None',
      value:
        t(baseTranslation + '.' + 'production.none.value', 'production.none.value'),
      tooltip:
        t(baseTranslation + '.' + 'production.none.tooltip', 'production.none.tooltip')
    },
    */
    {
      key: 'Equidistribution',
      value: t(baseTranslation + '.' + 'production.equi.value', 'production.equi.value'),
      tooltip: t(baseTranslation + '.' + 'production.equi.tooltip', 'production.equi.tooltip'),
    },
    {
      key: 'GreatestWorkload',
      value: t(baseTranslation + '.' + 'production.greatest.value', 'production.greatest.value'),
      tooltip: t(baseTranslation + '.' + 'production.greatest.tooltip', 'production.greatest.tooltip'),
    },
    {
      key: 'SmallestWorkload',
      value: t(baseTranslation + '.' + 'production.smallest.value', 'production.smallest.value'),
      tooltip: t(baseTranslation + '.' + 'production.smallest.tooltip', 'production.smallest.tooltip'),
    },
    {
      key: 'HighestPriority',
      value: t(baseTranslation + '.' + 'production.priority.value', 'production.priority.value'),
      tooltip: t(baseTranslation + '.' + 'production.priority.tooltip', 'production.priority.tooltip'),
    },
    {
      key: 'FromDataset',
      value: t(baseTranslation + '.' + 'production.from_dataset.value', 'production.from_dataset.value'),
      tooltip: t(baseTranslation + '.' + 'production.from_dataset.tooltip', 'production.from_dataset.tooltip'),
    },
  ];

  const stockProps = {
    disabled: !editMode,
    id: 'stock-input-id',
  };

  const sourcingProps = {
    disabled: !editMode,
    id: 'sourcing-input-id',
  };

  const stockDispatchProps = {
    disabled: !editMode,
    id: 'stockDispatch-input-id',
  };

  const productionProps = {
    disabled: !editMode,
    id: 'production-input-id',
  };

  return (
    <Grid container>
      {enumDisplay(
        baseTranslation + '.' + 'stock.label',
        'stock.label',
        baseTranslation + '.' + 'stock.tooltip',
        'stock.tooltip',
        setStockPolicy,
        stockProps,
        stockPolicy,
        stockEnumValues
      )}
      {enumDisplay(
        baseTranslation + '.' + 'sourcing.label',
        'sourcing.label',
        baseTranslation + '.' + 'sourcing.tooltip',
        'sourcing.tooltip',
        setSourcingPolicy,
        sourcingProps,
        sourcingPolicy,
        sourcingEnumValues
      )}
      {enumDisplay(
        baseTranslation + '.' + 'stockDispatch.label',
        'stockDispatch.label',
        baseTranslation + '.' + 'stockDispatch.tooltip',
        'stockDispatch.tooltip',
        setStockDispatchPolicy,
        stockDispatchProps,
        stockDispatchPolicy,
        stockDispatchEnumValues
      )}
      {enumDisplay(
        baseTranslation + '.' + 'production.label',
        'production.label',
        baseTranslation + '.' + 'production.tooltip',
        'production.tooltip',
        setProductionPolicy,
        productionProps,
        productionPolicy,
        productionEnumValues
      )}
    </Grid>
  );
};

FlowManagementPoliciesConfiguration.propTypes = {
  stockPolicy: PropTypes.string.isRequired,
  setStockPolicy: PropTypes.func.isRequired,
  sourcingPolicy: PropTypes.string.isRequired,
  setSourcingPolicy: PropTypes.func.isRequired,
  stockDispatchPolicy: PropTypes.string.isRequired,
  setStockDispatchPolicy: PropTypes.func.isRequired,
  productionPolicy: PropTypes.string.isRequired,
  setProductionPolicy: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default FlowManagementPoliciesConfiguration;
