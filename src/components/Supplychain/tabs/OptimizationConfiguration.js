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

const OptimizationConfiguration = ({ optimizationObjective, setOptimizationObjective, editMode }) => {
  const { t } = useTranslation();

  const optimizationObjectiveEnumValues = [
    {
      key: 'ServiceLevelMaximization',
      value: t(
        'genericcomponent.text.scenario.parameters.optimization_configuration.' +
          'optimization_objective.service_level_maximization',
        'Service Level Maximization'
      ),
    },
    {
      key: 'ProfitMaximization',
      value: t(
        'genericcomponent.text.scenario.parameters.optimization_configuration.' +
          'optimization_objective.profit_maximization',
        'Profit Maximization'
      ),
    },
  ];

  const optimizationObjectiveProps = {
    disabled: !editMode,
    id: 'optimization-objective-input-id',
  };

  return (
    <Grid container>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>
            {t(
              'genericcomponent.text.scenario.parameters.optimization_configuration.optimization_objective.title',
              'Optimization objective'
            )}
          </Typography>
          <StyledTooltip
            title={t(
              'genericcomponent.text.scenario.parameters.optimization_configuration.' +
                'optimization_objective.tooltip',
              'Optimization objective'
            )}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicEnumInput
            label=""
            changeEnumField={setOptimizationObjective}
            textFieldProps={optimizationObjectiveProps}
            value={optimizationObjective}
            enumValues={optimizationObjectiveEnumValues}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

OptimizationConfiguration.propTypes = {
  optimizationObjective: PropTypes.string.isRequired,
  setOptimizationObjective: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default OptimizationConfiguration;
