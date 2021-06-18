// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { STORAGE_ROOT_DIR_PLACEHOLDER } from './UploadFileConfig';
import { UPLOAD_FILE_STATUS_KEY } from '@cosmotech/ui';
import DatasetService from '../../services/dataset/DatasetService';
import { ORGANISATION_ID } from '../../configs/App.config';
import WorkspaceService from '../../services/workspace/WorkspaceService';
import fileDownload from 'js-file-download';
import { FileUpload } from './components/tabs';
import React from 'react';

function constructFileNameFromDataset (dataset, destinationUploadFile) {
  const fileName = dataset?.connector?.parametersValues.AZURE_STORAGE_CONTAINER_BLOB_PREFIX.split('/').pop();
  const fullName = destinationUploadFile + fileName;
  return fullName;
}

function updateStorageContainerBlobPrefix (dataset, destinationUploadFile) {
  dataset.current.connector.parametersValues.AZURE_STORAGE_CONTAINER_BLOB_PREFIX = destinationUploadFile;
}

const createConnector = (connectorId, scenarioId, parameterName, fileName) => {
  return {
    id: connectorId,
    parametersValues: {
      AZURE_STORAGE_CONTAINER_BLOB_PREFIX: `${STORAGE_ROOT_DIR_PLACEHOLDER}/${scenarioId}/${parameterName}/${fileName}`
    }
  };
};

async function fileManagement (dataset, datasetFile, setDatasetFile, datasetId, setDatasetId, parameterId, connectorId, scenarioId, workspaceId, destinationUploadFile) {
  if (datasetFile.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD) {
    await updateFileWithUpload(datasetFile, setDatasetFile, dataset, datasetId, parameterId, connectorId, scenarioId, workspaceId, destinationUploadFile);
  } else if (datasetFile.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DELETE) {
    await updateFileWithDelete(datasetFile, setDatasetFile, dataset, datasetId, setDatasetId, workspaceId, destinationUploadFile);
  }
}

async function updateFileWithUpload (datasetFile, setDatasetFile, dataset, datasetId, parameterId, connectorId, scenarioId, workspaceId, destinationUploadFile) {
  if (dataset.current && Object.keys(dataset.current).length !== 0) {
    const removeExistingFilePath = constructDestinationFile(scenarioId, parameterId, datasetFile.initialName);
    // Delete existing file
    await deleteFile(removeExistingFilePath, datasetFile, setDatasetFile, workspaceId);
    // File has been marked to be uploaded
    await uploadFile(dataset, datasetFile, setDatasetFile, workspaceId, destinationUploadFile);
    updateStorageContainerBlobPrefix(dataset, destinationUploadFile);
    const {
      error,
      data
    } = await DatasetService.updateDataset(ORGANISATION_ID, datasetId, dataset.current);
    if (error) {
      console.error(error);
    } else {
      dataset.current = data;
      setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD });
    }
  } else {
    // File has been marked to be uploaded
    await uploadFile(dataset.current, datasetFile, setDatasetFile, workspaceId, destinationUploadFile);
    // Create new dataset
    const {
      error,
      data
    } = await DatasetService.createDataset(ORGANISATION_ID, datasetFile.parameterId, datasetFile.description,
      createConnector(connectorId, scenarioId, datasetFile.parameterId, datasetFile.name));
    if (error) {
      console.error(error);
    } else {
      dataset.current = data;
      setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD });
    }
  }
}

async function updateFileWithDelete (datasetFile, setDatasetFile, dataset, datasetId, setDatasetId, workspaceId, destinationUploadFile) {
  // File has been marked to be deleted
  await deleteFile(destinationUploadFile, datasetFile, setDatasetFile, workspaceId);
  const { error } = await DatasetService.deleteDataset(ORGANISATION_ID, datasetId);
  if (error) {
    console.error(error);
  } else {
    dataset.current = {};
    setDatasetFile({ ...datasetFile, file: null, name: '', status: UPLOAD_FILE_STATUS_KEY.EMPTY });
    setDatasetId('');
  }
}

const handlePrepareToUpload = (event, datasetFile, setDatasetFile) => {
  const file = event.target.files[0];
  if (file === undefined) {
    return;
  }
  setDatasetFile({ ...datasetFile, file: file, name: file.name, status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD });
};

const uploadFile = async (dataset, datasetFile, setDatasetFile, workspaceId, destinationUploadFile) => {
  setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.UPLOADING });
  const overwrite = true;
  const { error, data } = await WorkspaceService.uploadWorkspaceFile(ORGANISATION_ID, workspaceId, datasetFile.file, overwrite, destinationUploadFile);
  if (error) {
    console.error(error);
  } else {
    // Handle unlikely case where currentDataset.current is null or undefined
    // which is most likely to require a manual clean on the backend.
    if (!dataset.current) {
      console.warn('Your previous file was in an awkward state. The backend may not be clean.');
    } else if (Object.keys(dataset.current).length !== 0) {
      updateStorageContainerBlobPrefix(dataset, STORAGE_ROOT_DIR_PLACEHOLDER + '/' + data.fileName);
    }
    setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD });
  }
};

const handlePrepareToDeleteFile = (datasetFile, setDatasetFile) => {
  setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.READY_TO_DELETE });
};

const deleteFile = async (connectorFilePath, datasetFile, setDatasetFile, workspaceId) => {
  setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.DELETING });
  const { error } = await WorkspaceService.deleteWorkspaceFile(ORGANISATION_ID, workspaceId, connectorFilePath);
  if (error) {
    console.error(error);
  } else {
    setDatasetFile({ ...datasetFile, file: null, name: '', status: UPLOAD_FILE_STATUS_KEY.EMPTY });
  }
};

const handleDownloadFile = async (dataset, datasetFile, setDatasetFile, scenarioId, parameterId, workspaceId) => {
  const destinationUploadFile = UploadFileUtils.constructDestinationFile(scenarioId, parameterId, datasetFile.name);
  setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.DOWNLOADING });
  const { error, data, response } = await WorkspaceService.downloadWorkspaceFile(ORGANISATION_ID, workspaceId, destinationUploadFile);
  if (error) {
    console.error(error);
  } else {
    console.log(response.type);
    console.log(response);
    const blob = new Blob([data], { type: response.type });
    fileDownload(blob, datasetFile.name);
  }
  setDatasetFile({ ...datasetFile, status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD });
};

const constructFileUpload = (key, file, setFile, scenarioId, currentDataset, datasetId, parameterId, workspaceId, acceptedFileTypesToUpload, editMode) => {
  return (
      <FileUpload key={key}
                  file={file}
                  setFile={setFile}
                  scenarioId={scenarioId}
                  currentDataset={currentDataset}
                  datasetId={datasetId}
                  parameterId={parameterId}
                  workspaceId={workspaceId}
                  acceptedFileTypesToUpload={acceptedFileTypesToUpload}
                  editMode={editMode}
      />);
};

const resetUploadFile = (datasetId, file, setFile) => {
  const initialName = file.initialName;
  if (file.initialName !== '') {
    setFile({ ...file, name: initialName, status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD });
  } else {
    setFile({ ...file, status: UPLOAD_FILE_STATUS_KEY.EMPTY });
  }
};

const constructDestinationFile = (scenarioId, parameterId, fileName) => scenarioId + '/' + parameterId + '/' + fileName;

export const UploadFileUtils = {
  constructFileNameFromDataset,
  constructDestinationFile,
  handleDownloadFile,
  handlePrepareToDeleteFile,
  handlePrepareToUpload,
  fileManagement,
  constructFileUpload,
  resetUploadFile
};
