// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, Typography, Zoom } from '@material-ui/core';
import { BasicEnumInput, BasicNumberInput } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';

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

  const sensitivityAnalysisSensitiveParameterEnumValues = [
    {
      key: 'Machine Opening Time',
      value: t(
        'genericcomponent.text.scenario.parameters.sensitivity_analysis.sensitive_parameter.machine_opening_time',
        'Machine Opening Time'
      ),
    },
    {
      key: 'Transport Duration',
      value: t(
        'genericcomponent.text.scenario.parameters.sensitivity_analysis.sensitive_parameter.transport_duration',
        'Transport Duration'
      ),
    },
    // {
    //   key: 'Transport cost',
    //   value: t(
    //       'genericcomponent.text.scenario.parameters.sensitivity_analysis.sensitive_parameter.transport_cost',
    //       'Transport cost'),
    // },
  ];

  const sensitivityAnalysisChangeEnumValues = [
    {
      key: 'relative',
      value: t('genericcomponent.text.scenario.parameters.sensitivity_analysis.change.relative', 'Relative'),
    },
    {
      key: 'absolute',
      value: t('genericcomponent.text.scenario.parameters.sensitivity_analysis.change.absolute', 'Absolute'),
    },
    {
      key: 'replacement',
      value: t('genericcomponent.text.scenario.parameters.sensitivity_analysis.change.replacement', 'Replacement'),
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
          <Typography>
            {t(
              'genericcomponent.text.scenario.parameters.sensitivity_analysis.sensitive_parameter.title',
              'sensitive_parameter.title'
            )}
          </Typography>
          <Tooltip
            title={t(
              'genericcomponent.text.scenario.parameters.sensitivity_analysis.sensitive_parameter.tooltip',
              'sensitive_parameter.tooltip'
            )}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </Tooltip>
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
      <Grid container>
        <Grid container item xs={4}>
          <Typography>
            {t('genericcomponent.text.scenario.parameters.sensitivity_analysis.change.title', 'change.title')}
          </Typography>
          <Tooltip
            title={t('genericcomponent.text.scenario.parameters.sensitivity_analysis.change.tooltip', 'change.tooltip')}
            placement="top-end"
            TransitionComponent={Zoom}
          >
            <InfoIcon style={{ fontSize: '14px', marginLeft: '4px' }} />
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <BasicEnumInput
            label=""
            changeEnumField={setSensitivityAnalysisChange}
            textFieldProps={sensitivityAnalysisChangeProps}
            value={sensitivityAnalysisChange}
            enumValues={sensitivityAnalysisChangeEnumValues}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>
            {t('genericcomponent.text.scenario.parameters.sensitivity_analysis.variation.title', 'variation.title')}
          </Typography>
          <Tooltip
            title={t(
              'genericcomponent.text.scenario.parameters.sensitivity_analysis.variation.tooltip',
              'variation.tooltip'
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
  sensitivityAnalysisSensitiveParameter: PropTypes.string.isRequired,
  setSensitivityAnalysisSensitiveParameter: PropTypes.func.isRequired,
  sensitivityAnalysisChange: PropTypes.string.isRequired,
  setSensitivityAnalysisChange: PropTypes.func.isRequired,
  sensitivityAnalysisVariation: PropTypes.number.isRequired,
  setSensitivityAnalysisVariation: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default SensitivityAnalysisConfiguration;
