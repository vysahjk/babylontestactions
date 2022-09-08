// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, Typography, Zoom } from '@material-ui/core';
import { BasicEnumInput } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';

const TransportUncertaintyConfiguration = ({
  transportUncertaintiesDistribution,
  setTransportUncertaintiesDistribution,
  editMode,
}) => {
  const { t } = useTranslation();

  const transportUncertaintiesDistributionEnumValues = [
    {
      key: 'discreteuniform',
      value: t(
        'genericcomponent.text.scenario.parameters.transportUncertainty.distribution.discreteuniform',
        'Discrete uniform'
      ),
    },
    {
      key: 'gamma',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.gamma', 'Gamma'),
    },
    {
      key: 'beta',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.beta', 'Beta'),
    },
    {
      key: 'truncnorm',
      value: t(
        'genericcomponent.text.scenario.parameters.transportUncertainty.distribution.truncnorm',
        'Truncated Normal'
      ),
    },
    {
      key: 'truncexpon',
      value: t(
        'genericcomponent.text.scenario.parameters.transportUncertainty.distribution.truncexpon',
        'Truncated exponential'
      ),
    },
    {
      key: 'weibull',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.weibull', 'Weibull'),
    },
    {
      key: 'triangular',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.triangular', 'Triangular'),
    },
    {
      key: 'normal',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.normal', 'Normal'),
    },
    {
      key: 'exponential',
      value: t(
        'genericcomponent.text.scenario.parameters.transportUncertainty.distribution.exponential',
        'Exponential'
      ),
    },
    {
      key: 'poisson',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.poisson', 'Poisson'),
    },
    {
      key: 'binomial',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.binomial', 'Binomial'),
    },
    {
      key: 'betabinom',
      value: t(
        'genericcomponent.text.scenario.parameters.transportUncertainty.distribution.betabinom',
        'Beta binomial'
      ),
    },
    {
      key: 'geom',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.geom', 'Geometric'),
    },
    {
      key: 'lognormal',
      value: t('genericcomponent.text.scenario.parameters.transportUncertainty.distribution.lognormal', 'Lognormal'),
    },
  ];

  const transportUncertaintiesDistributionProps = {
    disabled: !editMode,
    id: 'transport-uncertainties-distribution-input-id',
  };

  return (
    <Grid container>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>
            {t(
              'genericcomponent.text.scenario.parameters.transportUncertainty.distribution.title',
              'distribution.title'
            )}
          </Typography>
          <Tooltip
            title={t(
              'genericcomponent.text.scenario.parameters.transportUncertainty.distribution.tooltip',
              'distribution.tooltip'
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
            changeEnumField={setTransportUncertaintiesDistribution}
            textFieldProps={transportUncertaintiesDistributionProps}
            value={transportUncertaintiesDistribution}
            enumValues={transportUncertaintiesDistributionEnumValues}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

TransportUncertaintyConfiguration.propTypes = {
  transportUncertaintiesDistribution: PropTypes.string.isRequired,
  setTransportUncertaintiesDistribution: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default TransportUncertaintyConfiguration;
