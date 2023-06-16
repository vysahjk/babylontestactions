// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useCallback, useMemo } from 'react';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { TranslationUtils } from '../../../../utils';
import { Grid, Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BasicInputPlaceholder, TooltipInfo } from '@cosmotech/ui';
import { useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import { getDateAtMidnight } from '../../../../utils/DateUtils';

export const CustomDateInput = ({ parameterData, context, parameterValue, setParameterValue }) => {
  const key = parameterData.id;
  const id = `date-input-${parameterData.id}`;
  const label = t(`solution.parameters.${parameterData.id}`, parameterData.id);
  const tooltipText = t(TranslationUtils.getParameterTooltipTranslationKey(parameterData.id), '');
  const startDate = useWatch({
    name: 'start_date',
  });
  const endDate = useWatch({
    name: 'end_date',
  });
  const minDate = useMemo(() => {
    return parameterData.id === 'end_date'
      ? dayjs(startDate).add(1, 'day')
      : parameterData.minValue
      ? dayjs(parameterData.minValue)
      : undefined;
  }, [parameterData.id, startDate, parameterData.minValue]);

  const maxDate = useMemo(() => {
    return parameterData.id === 'start_date'
      ? dayjs(endDate).subtract(1, 'day')
      : parameterData.maxValue
      ? dayjs(parameterData.maxValue)
      : undefined;
  }, [parameterData.id, endDate, parameterData.maxValue]);

  const value = useMemo(() => {
    return parameterValue ?? new Date();
  }, [parameterValue]);

  const errorMessage = useMemo(() => {
    if (minDate && dayjs(value).isBefore(minDate)) {
      return t(
        'genericcomponent.text.scenario.parameters.time_configuration.date_boundaries_error',
        'time_configuration.date_boundaries_error'
      );
    }
    return '';
  }, [value, minDate]);

  const setDateValue = useCallback(
    (newValue) => {
      setParameterValue(getDateAtMidnight(newValue));
    },
    [setParameterValue]
  );

  if (!context.editMode)
    return (
      <BasicInputPlaceholder
        id={id}
        label={label}
        tooltipText={tooltipText}
        value={value.toLocaleDateString()}
        key={key}
      />
    );

  return (
    <Grid item id={id} xs={3}>
      <Stack data-cy={id} direction="row" spacing={1} alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={label}
            inputFormat={'MM/dd/yyyy'}
            minDate={minDate}
            maxDate={maxDate}
            renderInput={(params) => (
              <TextField variant="outlined" sx={{ flexGrow: 1 }} size="small" helperText={errorMessage} {...params} />
            )}
            id={id}
            onChange={setDateValue}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
            value={value}
            key={key}
          />
        </LocalizationProvider>
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
    </Grid>
  );
};

CustomDateInput.propTypes = {
  parameterData: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  parameterValue: PropTypes.any,
  setParameterValue: PropTypes.func.isRequired,
};
