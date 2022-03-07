// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Table, TABLE_DATA_STATUS, UPLOAD_FILE_STATUS_KEY } from '@cosmotech/ui';
import { AgGridUtils, Auth } from '@cosmotech/core';
import theme from '../../../theme';
import axios from 'axios';
import { ORGANIZATION_ID, WORKSPACE_ID } from '../../../config/AppInstance';
import { FileManagementUtils } from '../../../components/ScenarioParameters/FileManagementUtils';

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const _generateGridDataFromCSV = (fileContent, parameterMetadata, options) => {
  return AgGridUtils.fromCSV(fileContent, parameterMetadata.hasHeader || true, parameterMetadata?.columns, options);
};

const create = (t, datasets, parameterMetadata, parametersState, setParametersState, editMode, currentScenario) => {
  const parameterId = parameterMetadata.id;
  const parameter = parametersState[parameterId] || {};
  const labels = {
    label: t(`solution.parameters.${parameterId}`, parameterId),
    loading: t('genericcomponent.table.labels.loading', 'Loading...'),
    clearErrors: t('genericcomponent.table.button.clearErrors', 'Clear'),
    errorsPanelMainError: t('genericcomponent.table.labels.fileImportError', 'File load failed.'),
  };
  const columns = parameterMetadata?.columns || [];
  const dateFormat = DEFAULT_DATE_FORMAT;
  const options = { dateFormat: dateFormat };

  const setParameterInState = (newValue) => {
    setParametersState((currentParametersState) => ({
      ...currentParametersState,
      [parameterId]: newValue,
    }));
  };

  const setClientFileDescriptorStatuses = (newFileStatus, newTableDataStatus) => {
    setParameterInState({
      ...parameter,
      status: newFileStatus,
      tableDataStatus: newTableDataStatus,
    });
  };

  const _checkForLock = () => {
    if (create.downloadLocked === undefined) {
      create.downloadLocked = {};
    }
    if (parameterId in create.downloadLocked === false) {
      create.downloadLocked[parameterId] = false;
    }
    return create.downloadLocked[parameterId];
  };

  const _downloadDatasetContentFromAzureFunction = async (parameterDescriptor, setparameterDescriptor) => {
    if (_checkForLock()) {
      return;
    }
    create.downloadLocked[parameterId] = true;
    setparameterDescriptor({
      ...parameterDescriptor,
      agGridRows: null,
      name: parameterDescriptor.name,
      file: null,
      content: null,
      errors: null,
      status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD,
      tableDataStatus: TABLE_DATA_STATUS.DOWNLOADING,
    });
    const azureFunctionAddress = parameterMetadata?.azureFunction;
    const azureFunctionHeaders = parameterMetadata?.azureFunctionHeaders;
    if (azureFunctionAddress) {
      const tokens = await Auth.acquireTokens();
      const headers = { ...azureFunctionHeaders };
      if (tokens?.accessToken) {
        headers.common = {};
        headers.common.Authorization = 'Bearer ' + tokens.accessToken;
        console.log(headers.common.Authorization);
      }
      const _data = await axios({
        method: 'post',
        url: azureFunctionAddress,
        headers: headers,
        params: {
          'organization-id': ORGANIZATION_ID,
          'scenario-id': currentScenario.data.id,
          'workspace-id': WORKSPACE_ID,
        },
      });
      if (_data.data) {
        setparameterDescriptor({
          ...parameterDescriptor,
          file: null,
          name: 'content.csv',
          content: null,
          agGridRows: _data.data.rows,
          agGridColumns: _data.data.columns,
          errors: null,
          status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
          tableDataStatus: TABLE_DATA_STATUS.READY,
        });
      } else {
        setparameterDescriptor({
          ...parameterDescriptor,
          file: null,
          content: null,
          agGridRows: null,
          errors: [
            {
              summary: 'Error while calling the azure function',
              loc: null,
              context: null,
            },
          ],
          tableDataStatus: TABLE_DATA_STATUS.ERROR,
        });
      }
    } else {
      setparameterDescriptor({
        ...parameterDescriptor,
        file: null,
        content: null,
        agGridRows: null,
        errors: [
          {
            summary: 'Azure function is not declared',
            loc: null,
            context: null,
          },
        ],
        tableDataStatus: TABLE_DATA_STATUS.ERROR,
      });
    }
    create.downloadLocked[parameterId] = false;
  };

  const _downloadDatasetFileContentFromStorage = async (datasets, clientFileDescriptor, setClientFileDescriptor) => {
    if (_checkForLock()) {
      return;
    }
    create.downloadLocked[parameterId] = true;
    setClientFileDescriptor({
      ...clientFileDescriptor,
      agGridRows: null,
      name: clientFileDescriptor.name,
      file: null,
      content: null,
      errors: null,
      status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD,
      tableDataStatus: TABLE_DATA_STATUS.DOWNLOADING,
    });

    const datasetId = clientFileDescriptor.id;
    const data = await FileManagementUtils.downloadFileData(datasets, datasetId, setClientFileDescriptorStatuses);
    if (data) {
      const fileName = clientFileDescriptor.name;
      const finalStatus = UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD;
      _parseCSVFileContent(data, fileName, clientFileDescriptor, setClientFileDescriptor, finalStatus);
    } else {
      setClientFileDescriptor({
        ...clientFileDescriptor,
        agGridRows: null,
        name: clientFileDescriptor.name,
        file: null,
        content: null,
        errors: null,
        status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD,
        tableDataStatus: TABLE_DATA_STATUS.ERROR,
      });
    }
    create.downloadLocked[parameterId] = false;
  };

  const _parseCSVFileContent = (
    fileContent,
    fileName,
    clientFileDescriptor,
    setClientFileDescriptor,
    finalStatus,
    clientFileDescriptorRestoreValue
  ) => {
    setClientFileDescriptor({
      ...clientFileDescriptor,
      agGridRows: null,
      name: fileName,
      file: null,
      content: fileContent,
      errors: null,
      status: finalStatus,
      tableDataStatus: TABLE_DATA_STATUS.PARSING,
    });

    const agGridData = _generateGridDataFromCSV(fileContent, parameterMetadata, options);
    if (agGridData.error) {
      if (clientFileDescriptorRestoreValue) {
        setClientFileDescriptor({
          ...clientFileDescriptorRestoreValue,
          errors: agGridData.error,
        });
      } else {
        setClientFileDescriptor({
          ...clientFileDescriptor,
          errors: agGridData.error,
          tableDataStatus: TABLE_DATA_STATUS.ERROR,
        });
      }
    } else {
      setClientFileDescriptor({
        ...clientFileDescriptor,
        agGridRows: agGridData.rows,
        agGridColumns: agGridData.cols,
        name: fileName,
        file: null,
        content: fileContent,
        errors: agGridData.error,
        status: finalStatus,
        tableDataStatus: TABLE_DATA_STATUS.READY,
      });
    }
  };

  const onCellChange = (event) => {
    const newFileContent = AgGridUtils.toCSV(parameter.agGridRows, parameter.agGridColumns || columns, options);
    setParameterInState({
      ...parameter,
      errors: [],
      content: newFileContent,
      status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
      tableDataStatus: TABLE_DATA_STATUS.READY,
    });
  };

  const onClearErrors = () => {
    setParameterInState({
      ...parameter,
      errors: [],
    });
  };

  const buildErrorsPanelTitle = (errorsCount) => {
    return t('genericcomponent.table.labels.errorsCount', '{{count}} errors occured:', {
      count: errorsCount,
    });
  };

  const alreadyDownloaded =
    parameter.tableDataStatus !== undefined &&
    [
      TABLE_DATA_STATUS.ERROR,
      TABLE_DATA_STATUS.DOWNLOADING,
      TABLE_DATA_STATUS.READY,
      TABLE_DATA_STATUS.PARSING,
    ].includes(parameter.tableDataStatus);

  if (
    parameter.id &&
    !parameter.content &&
    parameter.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD &&
    !alreadyDownloaded
  ) {
    _downloadDatasetFileContentFromStorage(datasets, parameter, setParameterInState);
  } else if (!parameter.content && parameter.status === UPLOAD_FILE_STATUS_KEY.EMPTY && !alreadyDownloaded) {
    _downloadDatasetContentFromAzureFunction(parameter, setParameterInState);
  }

  return (
    <Table
      key={parameterId}
      data-cy={parameterMetadata.dataCy}
      labels={labels}
      dateFormat={dateFormat}
      editMode={editMode}
      dataStatus={parameter.tableDataStatus}
      errors={parameter.errors}
      columns={parameter.agGridColumns || columns}
      rows={parameter.agGridRows || []}
      agTheme={theme.grid.agTheme}
      onCellChange={onCellChange}
      onClearErrors={onClearErrors}
      buildErrorsPanelTitle={buildErrorsPanelTitle}
    />
  );
};

export const AzureFunctionTableFactory = {
  create,
};
