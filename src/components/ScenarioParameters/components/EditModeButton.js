// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Grid, IconButton, Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useTranslation } from 'react-i18next';
import { ACL_PERMISSIONS } from '../../../services/config/accessControl';
import { useUserAppAndCurrentScenarioPermissions } from '../../../hooks/SecurityHooks';
import { PermissionsGate } from '@cosmotech/ui';

const EditModeButton = ({ classes, handleClickOnDiscardChange, handleClickOnUpdateAndLaunchScenario }) => {
  const { t } = useTranslation();
  const userAppAndCurrentScenarioPermissions = useUserAppAndCurrentScenarioPermissions();

  return (
    <PermissionsGate
      userPermissions={userAppAndCurrentScenarioPermissions}
      necessaryPermissions={[ACL_PERMISSIONS.SCENARIO.WRITE]}
    >
      <Grid container spacing={1}>
        <Grid item>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={t('commoncomponents.button.scenario.parameters.discard', 'Discard changes')}
          >
            <IconButton data-cy="discard-button" color="primary" onClick={handleClickOnDiscardChange} size="large">
              <BackspaceIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={t('commoncomponents.button.scenario.parameters.update.launch', 'Update and launch')}
          >
            <IconButton
              data-cy="update-and-launch-scenario"
              color="primary"
              onClick={handleClickOnUpdateAndLaunchScenario}
              size="large"
            >
              <PlayCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </PermissionsGate>
  );
};

EditModeButton.propTypes = {
  classes: PropTypes.any.isRequired,
  handleClickOnDiscardChange: PropTypes.func.isRequired,
  handleClickOnUpdateAndLaunchScenario: PropTypes.func.isRequired,
};

export default EditModeButton;
