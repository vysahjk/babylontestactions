// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useRef } from 'react';

import { connect, useSelector } from 'react-redux';
import { Grid, Stack } from '@mui/material';
// eslint-disable-next-line max-len
import ScenarioParameterInput from '../../../components/ScenarioParameters/components/ScenarioParametersTabs/ScenarioParameterInput';
import { PermissionsGate, SelfDestructLinkButton } from '@cosmotech/ui';
import { ConfigUtils } from '../..';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import makeStyles from '@mui/styles/makeStyles';
import ScenarioService from '../../../services/scenario/ScenarioService';

const DATASET_DOWNLOAD_TIMEOUT = 15 * 60;
const DATASET_DOWNLOAD_POLLING_DELAY = 10 * 1000;

const useStyles = makeStyles((theme) => ({
  datasetDownloadButton: {
    marginBottom: '15px',
  },
}));

const MassActionLeverParameterTab = ({ parametersGroupData, context, userAppRoles }) => {
  const noPermissionsPlaceHolder = (t) => {
    return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
  };

  const scenarioId = useSelector((state) => state.scenario?.current?.data?.id);
  const workspaceId = useSelector((state) => state.workspace?.current?.data?.id);
  const authorizedRoles = ConfigUtils.getParametersGroupAttribute(parametersGroupData, 'authorizedRoles');
  const isParameterVisible = (parameter) => ConfigUtils.getParameterAttribute(parameter, 'hidden') !== true;

  const classes = useStyles();
  const timeoutId = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);
  const timeout = (ms) => {
    return new Promise((resolve) => {
      timeoutId.current = setTimeout(resolve, ms);
    });
  };

  const startPolling = async (sdlId) => {
    let jobInfo;
    let state;
    jobInfo = await ScenarioService.getScenarioDataDownloadJobInfo(workspaceId, scenarioId, sdlId);
    state = jobInfo?.state;
    while (state === 'Running' || state === 'Unknown') {
      await timeout(DATASET_DOWNLOAD_POLLING_DELAY);
      jobInfo = await ScenarioService.getScenarioDataDownloadJobInfo(workspaceId, scenarioId, sdlId);
      state = jobInfo.state;
    }
    if (state === 'Successful') {
      return jobInfo.url;
    }
    console.error('Error during generation of dataset download link');
    return '';
  };
  const generate = async () => {
    const sdlId = await ScenarioService.downloadScenarioData(workspaceId, scenarioId);
    return await startPolling(sdlId);
  };

  const megaLeverProps = {
    download: t('genericcomponent.uploadfile.mass_action_lever.download', 'mass_action_lever.download'),
    generateLink: t('genericcomponent.uploadfile.mass_action_lever.generate', 'mass_action_lever.generate'),
  };

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      necessaryPermissions={authorizedRoles}
      sufficientPermissions={authorizedRoles}
      userPermissions={userAppRoles}
    >
      <Grid container key={parametersGroupData.id}>
        <Grid item xs={12}>
          <Stack spacing={2} alignItems="stretch" direction="column" justifyContent="center">
            <div className={classes.datasetDownloadButton}>
              <SelfDestructLinkButton
                generate={generate}
                labels={megaLeverProps}
                timeout={DATASET_DOWNLOAD_TIMEOUT}
                width="350px"
                height="40px"
              />
            </div>
            {parametersGroupData.parameters
              .filter((parameter) => isParameterVisible(parameter))
              .map((parameterData) => (
                <ScenarioParameterInput
                  key={`${scenarioId}_${parameterData.id}`}
                  parameterData={parameterData}
                  context={context}
                />
              ))}
          </Stack>
        </Grid>
      </Grid>
    </PermissionsGate>
  );
};

MassActionLeverParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  userAppRoles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  userAppRoles: state.auth.roles,
});

export default connect(mapStateToProps)(MassActionLeverParameterTab);
