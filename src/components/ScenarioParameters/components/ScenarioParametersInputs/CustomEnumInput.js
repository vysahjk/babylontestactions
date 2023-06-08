// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { TooltipInfo } from '@cosmotech/ui';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ConfigUtils, TranslationUtils } from '../../../../utils';
import { Fade, Grid, MenuItem, Stack, TextField, Tooltip as MuiTooltip, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const Tooltip = ({ children, title, ...other }) => {
  return title ? (
    <MuiTooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      title={title}
      placement="right"
      arrow
      {...other}
    >
      {children}
    </MuiTooltip>
  ) : (
    children
  );
};

Tooltip.propTypes = {
  /**
   * Elements that trigger the tooltip when hovered
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /**
   * Tooltip text
   */
  title: PropTypes.string,
};

const FadingTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
    maxWidth: '600px',
  },
  sx: {
    width: 'fit-content',
  },
}))(Tooltip);

export const CustomEnumInput = ({ parameterData, context, parameterValue, setParameterValue }) => {
  const { t } = useTranslation();
  const textFieldProps = {
    disabled: !context.editMode,
    id: `enum-input-${parameterData.id}`,
  };

  let enumValues = ConfigUtils.getParameterAttribute(parameterData, 'enumValues');
  if (!enumValues) {
    console.warn(
      `Enum values are not defined for scenario parameter "${parameterData.id}".\n` +
        'Please provide an array in the "options.enumValues" field for this parameter in the parameters ' +
        'configuration file.'
    );
    enumValues = [];
  }

  const id = parameterData.id;
  const label = t(`solution.parameters.${parameterData.id}`, parameterData.id);
  const tooltipText = t(TranslationUtils.getParameterTooltipTranslationKey(parameterData.id), '');
  const value = parameterValue ?? enumValues?.[0]?.key ?? '';
  const changeEnumField = setParameterValue;

  const baseTranslation = 'genericcomponent.text.scenario.parameters.' + id + '.';

  const enumText = enumValues.map((option) => ({
    key: option?.key,
    value: t(`${baseTranslation}${option?.key}.label`, option?.value),
    tooltip: t(`${baseTranslation}${option?.key}.tooltip`, ''),
  }));

  const enumTooltipValue = enumText.find((elem) => elem?.key === value)?.tooltip;

  if (textFieldProps.disabled)
    return (
      <Stack data-cy={`enum-input-${id}`}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography data-cy="disabled-input-label" variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
          <TooltipInfo title={tooltipText} />
        </Stack>
        <FadingTooltip title={enumTooltipValue}>
          <Typography data-cy="disabled-input-value" variant="body2" sx={{ ml: 1, width: 'fit-content' }}>
            {enumText.find((elem) => elem?.key === value)?.value}
          </Typography>
        </FadingTooltip>
      </Stack>
    );

  return (
    <Grid item xs={3}>
      <Stack data-cy={`enum-input-${id}`} direction="row" spacing={1} alignItems="center">
        <FadingTooltip title={enumTooltipValue}>
          <TextField
            variant="outlined"
            label={label}
            size="small"
            sx={{ flexGrow: 1 }}
            select
            value={value}
            onChange={(event) => {
              return changeEnumField(event.target.value);
            }}
          >
            {enumValues.map((option) => (
              <MenuItem key={option?.key} value={option?.key} data-cy={option?.key}>
                {enumText.find((elem) => elem?.key === option?.key)?.value}
              </MenuItem>
            ))}
          </TextField>
        </FadingTooltip>
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
    </Grid>
  );
};

CustomEnumInput.propTypes = {
  parameterData: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  parameterValue: PropTypes.any,
  setParameterValue: PropTypes.func.isRequired,
};
