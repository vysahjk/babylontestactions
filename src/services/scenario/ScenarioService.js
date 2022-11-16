// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { Api } from '../../services/config/Api';
import { ORGANIZATION_ID } from '../../config/GlobalConfiguration';
import { SCENARIO_VALIDATION_STATUS } from '../config/ApiConstants.js';

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

async function resetValidationStatus(workspaceId, scenarioId) {
  const data = { validationStatus: SCENARIO_VALIDATION_STATUS.DRAFT };
  return Api.Scenarios.updateScenario(ORGANIZATION_ID, workspaceId, scenarioId, data);
}

async function setScenarioValidationStatusToValidated(workspaceId, scenarioId) {
  return setValidationStatus(workspaceId, scenarioId, SCENARIO_VALIDATION_STATUS.VALIDATED);
}

async function setScenarioValidationStatusToRejected(workspaceId, scenarioId) {
  return setValidationStatus(workspaceId, scenarioId, SCENARIO_VALIDATION_STATUS.REJECTED);
}

async function setValidationStatus(workspaceId, scenarioId, validationStatus) {
  const data = { validationStatus: validationStatus };
  return Api.Scenarios.updateScenario(ORGANIZATION_ID, workspaceId, scenarioId, data);
}

const ScenarioService = {
  resetValidationStatus,
  setScenarioValidationStatusToValidated,
  setScenarioValidationStatusToRejected,
  downloadScenarioData,
  getScenarioDataDownloadJobInfo,
};

export default ScenarioService;
