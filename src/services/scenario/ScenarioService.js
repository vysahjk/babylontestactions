// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { Api } from '../../services/config/Api';
import { SCENARIO_VALIDATION_STATUS } from '../config/ApiConstants.js';
import ConfigService from '../../services/ConfigService';

const ORGANIZATION_ID = ConfigService.getParameterValue('ORGANIZATION_ID');

async function downloadScenarioData(workspaceId, scenarioId) {
  try {
    const { data, status } = await Api.Scenarios.downloadScenarioData(ORGANIZATION_ID, workspaceId, scenarioId);
    if (status < 200 || status >= 400) {
      throw new Error('Error in downloadScenarioData');
    }
    return data.id;
  } catch (e) {
    console.error(e);
  }
}

async function getScenarioDataDownloadJobInfo(workspaceId, scenarioId, scenarioDownloadId) {
  try {
    const { data, status } = await Api.Scenarios.getScenarioDataDownloadJobInfo(
      ORGANIZATION_ID,
      workspaceId,
      scenarioId,
      scenarioDownloadId
    );
    if (status < 200 || status >= 400) {
      throw new Error('Error in getScenarioDataDownloadJobInfo');
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function resetValidationStatus(organizationId, workspaceId, scenarioId) {
  const data = { validationStatus: SCENARIO_VALIDATION_STATUS.DRAFT };
  return Api.Scenarios.updateScenario(organizationId, workspaceId, scenarioId, data);
}

async function setScenarioValidationStatusToValidated(organizationId, workspaceId, scenarioId) {
  return setValidationStatus(organizationId, workspaceId, scenarioId, SCENARIO_VALIDATION_STATUS.VALIDATED);
}

async function setScenarioValidationStatusToRejected(organizationId, workspaceId, scenarioId) {
  return setValidationStatus(organizationId, workspaceId, scenarioId, SCENARIO_VALIDATION_STATUS.REJECTED);
}

async function setValidationStatus(organizationId, workspaceId, scenarioId, validationStatus) {
  const data = { validationStatus };
  return Api.Scenarios.updateScenario(organizationId, workspaceId, scenarioId, data);
}

const ScenarioService = {
  resetValidationStatus,
  setScenarioValidationStatusToValidated,
  setScenarioValidationStatusToRejected,
  downloadScenarioData,
  getScenarioDataDownloadJobInfo,
};

export default ScenarioService;
