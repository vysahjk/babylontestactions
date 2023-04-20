// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, Typography, Zoom } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { BasicEnumInput } from '@cosmotech/ui';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';

const StyledTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
  },
}))(Tooltip);

const UncertaintyConfiguration = ({ uncertaintiesDistribution, setUncertaintiesDistribution, editMode }) => {
  const { t } = useTranslation();

  const uncertaintiesDistributionEnumValues = [
    {
      key: 'Gaussian',
      value: t('genericcomponent.text.scenario.parameters.uncertainty.distribution.gaussian', 'Gaussian'),
    },
    {
      key: 'Uniform',
      value: t('genericcomponent.text.scenario.parameters.uncertainty.distribution.uniform', 'Uniform'),
    },
  ];

  const uncertaintiesDistributionProps = {
    disabled: !editMode,
    id: 'uncertainties-distribution-input-id',
  };

  return (
    <Grid container>
      <Grid container>
        <Grid container item xs={4}>
          <Typography>
            {t('genericcomponent.text.scenario.parameters.uncertainty.distribution.title', 'distribution.title')}
          </Typography>
          <StyledTooltip
            title={t(
              'genericcomponent.text.scenario.parameters.uncertainty.distribution.tooltip',
              'distribution.tooltip'
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
            changeEnumField={setUncertaintiesDistribution}
            textFieldProps={uncertaintiesDistributionProps}
            value={uncertaintiesDistribution}
            enumValues={uncertaintiesDistributionEnumValues}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

UncertaintyConfiguration.propTypes = {
  uncertaintiesDistribution: PropTypes.string.isRequired,
  setUncertaintiesDistribution: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

UncertaintyConfiguration.defaultProps = {
  uncertaintiesDistribution: '',
};

export default UncertaintyConfiguration;
