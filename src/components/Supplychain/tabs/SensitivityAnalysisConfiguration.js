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
    maxWidth: 600,
  },
}))(Tooltip);

const SensitivityAnalysisConfiguration = ({
  sensitivityAnalysisSensitiveParameter,
  setSensitivityAnalysisSensitiveParameter,
  sensitivityAnalysisChange,
  setSensitivityAnalysisChange,
  sensitivityAnalysisVariation,
  setSensitivityAnalysisVariation,
  sensitivityAnalysisTimeInterval,
  setSensitivityAnalysisTimeInterval,
  sensitivityAnalysisInitialTimeStep,
  setSensitivityAnalysisInitialTimeStep,
  sensitivityAnalysisFinalTimeStep,
  setSensitivityAnalysisFinalTimeStep,
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

  const SensitiveParameterEnumValue = (base, label) => ({
    key: label,
    value: t(base + 'sensitive_parameter.' + label.toLowerCase().replaceAll(' ', '_'), label),
  });

  const sensitivityAnalysisSensitiveParameterEnumValues = [
    SensitiveParameterEnumValue(baseTranslation, 'Production Resource Opening Time'),
    SensitiveParameterEnumValue(baseTranslation, 'Transport Duration'),
    SensitiveParameterEnumValue(baseTranslation, 'Fixed Production Cost'),
    SensitiveParameterEnumValue(baseTranslation, 'Operating Performance'),
    SensitiveParameterEnumValue(baseTranslation, 'Cycle Time'),
    SensitiveParameterEnumValue(baseTranslation, 'Variable Production Cost'),
    SensitiveParameterEnumValue(baseTranslation, 'Production CO2 Unit Emissions'),
    SensitiveParameterEnumValue(baseTranslation, 'Production Minimum Order Quantity'),
    SensitiveParameterEnumValue(baseTranslation, 'Production Multiple Order Quantity'),
    SensitiveParameterEnumValue(baseTranslation, 'Production Plan'),
    SensitiveParameterEnumValue(baseTranslation, 'Initial Stock'),
    SensitiveParameterEnumValue(baseTranslation, 'Purchasing Unit Cost'),
    SensitiveParameterEnumValue(baseTranslation, 'Unit Income'),
    SensitiveParameterEnumValue(baseTranslation, 'Storage Unit Cost'),
    SensitiveParameterEnumValue(baseTranslation, 'Order Point'),
    SensitiveParameterEnumValue(baseTranslation, 'Order Quantities'),
    SensitiveParameterEnumValue(baseTranslation, 'Order Up To Levels'),
    SensitiveParameterEnumValue(baseTranslation, 'Safety Quantities'),
    SensitiveParameterEnumValue(baseTranslation, 'Transport Unit Cost'),
    SensitiveParameterEnumValue(baseTranslation, 'Custom Fees'),
    SensitiveParameterEnumValue(baseTranslation, 'Transport CO2 Unit Emission'),
    SensitiveParameterEnumValue(baseTranslation, 'Transport Minimum Order Quantity'),
    SensitiveParameterEnumValue(baseTranslation, 'Transport Multiple Order Quantity'),
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

  const sensitivityAnalysisTimeIntervalProps = {
    disabled: !editMode,
    id: 'sensitivity-analysis-timeinterval-id',
  };

  const sensitivityAnalysisInitialTimeStepProps = {
    disabled: !editMode,
    id: 'sensitivity-analysis-initialtimestep-id',
  };

  const sensitivityAnalysisInitialTimeStepLimitsProps = {
    min: 0,
    max: 100000000,
  };

  const sensitivityAnalysisFinalTimeStepProps = {
    disabled: !editMode,
    id: 'sensitivity-analysis-finaltimestep-id',
  };

  const sensitivityAnalysisFinalTimeStepLimitsProps = {
    min: 0,
    max: 100000000,
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
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'timeinterval.title', 'timeinterval.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'timeinterval.tooltip', 'timeinterval.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicToggleInput
            label=""
            changeSwitchType={setSensitivityAnalysisTimeInterval}
            switchProps={sensitivityAnalysisTimeIntervalProps}
            value={isTrue(sensitivityAnalysisTimeInterval)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'initialtimestep.title', 'initialtimestep.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'initialtimestep.tooltip', 'initialtimestep.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicNumberInput
            label=""
            changeNumberField={setSensitivityAnalysisInitialTimeStep}
            textFieldProps={sensitivityAnalysisInitialTimeStepProps}
            inputProps={sensitivityAnalysisInitialTimeStepLimitsProps}
            value={sensitivityAnalysisInitialTimeStep}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>{t(baseTranslation + 'finaltimestep.title', 'finaltimestep.title')}</Typography>
          <StyledTooltip
            title={t(baseTranslation + 'finaltimestep.tooltip', 'finaltimestep.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </StyledTooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicNumberInput
            label=""
            changeNumberField={setSensitivityAnalysisFinalTimeStep}
            textFieldProps={sensitivityAnalysisFinalTimeStepProps}
            inputProps={sensitivityAnalysisFinalTimeStepLimitsProps}
            value={sensitivityAnalysisFinalTimeStep}
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
  sensitivityAnalysisTimeInterval: PropTypes.bool,
  setSensitivityAnalysisTimeInterval: PropTypes.func,
  sensitivityAnalysisInitialTimeStep: PropTypes.bigint,
  setSensitivityAnalysisInitialTimeStep: PropTypes.func,
  sensitivityAnalysisFinalTimeStep: PropTypes.bigint,
  setSensitivityAnalysisFinalTimeStep: PropTypes.func,
  editMode: PropTypes.bool,
};

export default SensitivityAnalysisConfiguration;
