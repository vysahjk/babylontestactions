// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, Typography, Zoom, withStyles } from '@material-ui/core';
import { BasicEnumInput, BasicNumberInput } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';

const StyledTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
  },
}))(Tooltip);

const SensitivityAnalysisConfiguration = ({
  sensitivityAnalysisSensitiveParameter,
  setSensitivityAnalysisSensitiveParameter,
  sensitivityAnalysisChange,
  setSensitivityAnalysisChange,
  sensitivityAnalysisVariation,
  setSensitivityAnalysisVariation,
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

  const baseTranslation = 'genericcomponent.text.scenario.parameters.sensitivity_analysis.';

  const sensitivityAnalysisSensitiveParameterEnumValues = [
    {
      key: 'Machine Opening Time',
      value: t(baseTranslation + 'sensitive_parameter.machine_opening_time', 'Machine Opening Time'),
    },
    {
      key: 'Transport Duration',
      value: t(baseTranslation + 'sensitive_parameter.transport_duration', 'Transport Duration'),
    },
    // {
    //   key: 'Transport cost',
    //   value: t(
    //       baseTranslation + 'sensitive_parameter.transport_cost',
    //       'Transport cost'),
    // },
  ];

  const sensitivityAnalysisChangeEnumValues = [
    {
      key: 'relative',
      value: t(baseTranslation + 'change.relative.value', 'change.relative.value'),
      tooltip: t(baseTranslation + 'change.relative.tooltip', 'change.relative.tooltip'),
    },
    {
      key: 'absolute',
      value: t(baseTranslation + 'change.absolute.value', 'change.absolute.value'),
      tooltip: t(baseTranslation + 'change.absolute.tooltip', 'change.absolute.tooltip'),
    },
    {
      key: 'replacement',
      value: t(baseTranslation + 'change.replacement.value', 'change.replacement.value'),
      tooltip: t(baseTranslation + 'change.replacement.tooltip', 'change.replacement.tooltip'),
    },
  ];

  const sensitivityAnalysisSensitiveParameterProps = {
    disabled: !editMode,
    id: 'sensitivity-analysis-sensitive-parameter-id',
  };

  const sensitivityAnalysisChangeProps = {
    disabled: !editMode,
    id: 'sensitivity-analysis-change-id',
  };

  const sensitivityAnalysisVariationProps = {
    disabled: !editMode,
    id: 'sensitivity-analysis-variation-id',
  };

  const sensitivityAnalysisVariationLimitsProps = {
    min: -100000000.0,
    max: 100000000.0, // TODO possible to variabilise based on sensitive parameter ?
  };

  return (
    <Grid container>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'sensitive_parameter.title', 'sensitive_parameter.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'sensitive_parameter.tooltip', 'sensitive_parameter.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicEnumInput
            label=""
            changeEnumField={setSensitivityAnalysisSensitiveParameter}
            textFieldProps={sensitivityAnalysisSensitiveParameterProps}
            value={sensitivityAnalysisSensitiveParameter}
            enumValues={sensitivityAnalysisSensitiveParameterEnumValues}
          />
        </Grid>
      </Grid>
      {enumDisplay(
        baseTranslation + 'change.title',
        'change.title',
        baseTranslation + 'change.tooltip',
        'change.tooltip',
        setSensitivityAnalysisChange,
        sensitivityAnalysisChangeProps,
        sensitivityAnalysisChange,
        sensitivityAnalysisChangeEnumValues
      )}
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'variation.title', 'variation.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'variation.tooltip', 'variation.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicNumberInput
            label=""
            changeNumberField={setSensitivityAnalysisVariation}
            textFieldProps={sensitivityAnalysisVariationProps}
            inputProps={sensitivityAnalysisVariationLimitsProps}
            value={sensitivityAnalysisVariation}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

SensitivityAnalysisConfiguration.propTypes = {
  sensitivityAnalysisSensitiveParameter: PropTypes.string,
  setSensitivityAnalysisSensitiveParameter: PropTypes.func,
  sensitivityAnalysisChange: PropTypes.string,
  setSensitivityAnalysisChange: PropTypes.func,
  sensitivityAnalysisVariation: PropTypes.number,
  setSensitivityAnalysisVariation: PropTypes.func,
  editMode: PropTypes.bool,
};

export default SensitivityAnalysisConfiguration;
