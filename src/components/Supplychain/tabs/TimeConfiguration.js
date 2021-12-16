// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { BasicDateInput, BasicEnumInput } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';

const TimeConfiguration = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  simulationGranularity,
  setSimulationGranularity,
  editMode,
}) => {
  const { t } = useTranslation();

  // Force date type conversion for old scenarios data (this fix is necessary
  // until old scenarios are removed)
  if (typeof startDate === 'string') {
    startDate = new Date(startDate);
  }
  if (typeof endDate === 'string') {
    endDate = new Date(endDate);
  }

  const simulationGranularityEnumValues = [
    {
      key: 'minute',
      value: t('genericcomponent.text.scenario.parameters.units.min', 'Minute'),
    },
    {
      key: 'hour',
      value: t('genericcomponent.text.scenario.parameters.units.hour', 'Hour'),
    },
    {
      key: 'day',
      value: t('genericcomponent.text.scenario.parameters.units.day', 'Day'),
    },
    {
      key: 'week',
      value: t('genericcomponent.text.scenario.parameters.units.week', 'Week'),
    },
    {
      key: 'month',
      value: t('genericcomponent.text.scenario.parameters.units.month', 'Month'),
    },
    {
      key: 'quarter',
      value: t('genericcomponent.text.scenario.parameters.units.quarter', 'Quarter'),
    },
    {
      key: 'year',
      value: t('genericcomponent.text.scenario.parameters.units.year', 'Year'),
    },
  ];

  const simulationGranularityProps = {
    disabled: !editMode,
    id: 'simulation-granularity-input-id',
  };

  const getMaxStartDate = (endDate) => {
    if (endDate === undefined || endDate === null) {
      return undefined;
    }
    return new Date(endDate).setDate(endDate.getDate() - 1);
  };

  const getMinEndDate = (startDate) => {
    if (startDate === undefined || startDate === null) {
      return undefined;
    }
    return new Date(startDate).setDate(startDate.getDate() + 1);
  };

  const startDateProps = {
    disabled: !editMode,
    maxDate: getMaxStartDate(endDate),
    maxDateMessage: ' ', // Leave empty to prevent placeholder to be displayed
  };
  const endDateProps = {
    disabled: !editMode,
    minDate: getMinEndDate(startDate),
    minDateMessage: t(
      'genericcomponent.text.scenario.parameters.time_configuration.date_boundaries_error',
      'The simulation start date must be before the simulation end date'
    ),
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="flex-start">
      <BasicEnumInput
        label={t(
          'genericcomponent.text.scenario.parameters.time_configuration.simulation_granularity',
          'Simulation granularity'
        )}
        changeEnumField={setSimulationGranularity}
        textFieldProps={simulationGranularityProps}
        enumValues={simulationGranularityEnumValues}
        value={simulationGranularity}
      />
      <BasicDateInput
        id={'start-date-input-id'}
        label={t('genericcomponent.text.scenario.parameters.time_configuration.start_date', 'Start date')}
        changeSelectedDate={setStartDate}
        dateProps={startDateProps}
        value={startDate}
      />
      <BasicDateInput
        id={'end-date-input-id'}
        value={endDate}
        label={t('genericcomponent.text.scenario.parameters.time_configuration.end_date', 'End date')}
        changeSelectedDate={setEndDate}
        dateProps={endDateProps}
      />
    </Grid>
  );
};

TimeConfiguration.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  simulationGranularity: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setSimulationGranularity: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default TimeConfiguration;
