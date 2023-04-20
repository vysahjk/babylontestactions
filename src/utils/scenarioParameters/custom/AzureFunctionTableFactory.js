// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import rfdc from 'rfdc';
import { Table, TABLE_DATA_STATUS, UPLOAD_FILE_STATUS_KEY } from '@cosmotech/ui';
import { Button } from '@mui/material';
import { AgGridUtils, Auth, FileBlobUtils } from '@cosmotech/core';
import { gridDark, gridLight } from '../../../theme';
import axios from 'axios';
import ConfigService from '../../../services/ConfigService';
import { FileManagementUtils } from '../../../utils/FileManagementUtils';

const ORGANIZATION_ID = ConfigService.getParameterValue('ORGANIZATION_ID');
const WORKSPACE_ID = ConfigService.getParameterValue('WORKSPACE_ID');

const theme = { gridDark, gridLight };

const clone = rfdc();

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const _generateGridDataFromCSV = (fileContent, parameterMetadata, options) => {
  return AgGridUtils.fromCSV(fileContent, parameterMetadata.hasHeader || true, parameterMetadata?.columns, options);
};

const _generateGridDataFromXLSX = async (fileBlob, parameterData, options) => {
  return await AgGridUtils.fromXLSX(fileBlob, parameterData.hasHeader || true, parameterData.columns, options);
};

const checkCsvContent = (data, parameterData, parameterDescriptor, options) => {
  const fileContent = AgGridUtils.toCSV(data.rows, data.columns);
  const agGridData = _generateGridDataFromCSV(fileContent, parameterData, options);
  if (agGridData.error) {
    return {
      errors: agGridData.error,
      tableDataStatus: TABLE_DATA_STATUS.ERROR,
    };
  } else {
    return {
      file: null,
      name: 'content.csv',
      content: fileContent,
      agGridRows: data.rows,
      agGridColumns: data.columns,
      errors: null,
      status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
      tableDataStatus: TABLE_DATA_STATUS.READY,
    };
  }
};

export const AzureFunctionTableFactory = ({ parameterData, parametersState, setParametersState, context }) => {
  const { t } = useTranslation();
  const parameterId = parameterData.id;
  const parameter = parametersState[parameterId] || {};
  const datasets = useSelector((state) => state.dataset?.list?.data);
  const scenarioId = useSelector((state) => state.scenario?.current?.data?.id);
  const lockId = `${scenarioId}_${parameterId}`;

  const labels = {
    label: t(`solution.parameters.${parameterId}`, parameterId),
    loading: t('genericcomponent.table.labels.loading', 'Loading...'),
    clearErrors: t('genericcomponent.table.button.clearErrors', 'Clear'),
    errorsPanelMainError: t('genericcomponent.table.labels.fileImportError', 'File load failed.'),
  };
  const columns = parameterData?.columns || [];
  const dateFormat = parameterData?.dateFormat ?? DEFAULT_DATE_FORMAT;
  const options = { dateFormat };

  function setParameterInState(newValuePart) {
    setParametersState((currentParametersState) => ({
      ...currentParametersState,
      [parameterId]: {
        ...currentParametersState[parameterId],
        ...newValuePart,
      },
    }));
  }

  function setClientFileDescriptorStatuses(newFileStatus, newTableDataStatus) {
    setParameterInState({
      status: newFileStatus,
      tableDataStatus: newTableDataStatus,
    });
  }

  const _checkForLock = () => {
    if (AzureFunctionTableFactory.downloadLocked === undefined) {
      AzureFunctionTableFactory.downloadLocked = {};
    } else if (lockId in AzureFunctionTableFactory.downloadLocked === false) {
      AzureFunctionTableFactory.downloadLocked[lockId] = false;
    } else if (AzureFunctionTableFactory.downloadLocked[lockId]) {
      return true;
    }
    return false;
  };

  const _downloadDatasetContentFromAzureFunction = async (parameterDescriptor, setparameterDescriptor) => {
    if (_checkForLock()) {
      return;
    }
    AzureFunctionTableFactory.downloadLocked[parameterId] = true;
    setparameterDescriptor({
      agGridRows: null,
      name: parameterDescriptor.name,
      file: null,
      content: null,
      errors: null,
      status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD,
      tableDataStatus: TABLE_DATA_STATUS.DOWNLOADING,
    });
    const azureFunctionAddress = parameterData?.azureFunction;
    const azureFunctionHeaders = parameterData?.azureFunctionHeaders;
    if (azureFunctionAddress) {
      const tokens = await Auth.acquireTokens();
      const headers = { ...azureFunctionHeaders };
      if (tokens?.accessToken) {
        headers.common = {};
        headers.common.Authorization = 'Bearer ' + tokens.accessToken;
      }
      const { data } = await axios({
        method: 'post',
        url: azureFunctionAddress,
        headers,
        params: {
          'organization-id': ORGANIZATION_ID,
          'scenario-id': context.currentScenario.id,
          'workspace-id': WORKSPACE_ID,
        },
      });
      if (data) {
        const responseDescriptor = checkCsvContent(
          data,
          parameterData,
          setparameterDescriptor,
          parameterDescriptor,
          options
        );
        setparameterDescriptor(responseDescriptor);
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
    AzureFunctionTableFactory.downloadLocked[parameterId] = false;
  };

  const _downloadDatasetFileContentFromStorage = async (datasets, clientFileDescriptor, setClientFileDescriptor) => {
    if (_checkForLock()) {
      return;
    }
    AzureFunctionTableFactory.downloadLocked[parameterId] = true;
    setClientFileDescriptor({
      agGridRows: null,
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
        agGridRows: null,
        file: null,
        content: null,
        errors: null,
        status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD,
        tableDataStatus: TABLE_DATA_STATUS.ERROR,
      });
    }
    AzureFunctionTableFactory.downloadLocked[parameterId] = false;
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
      agGridRows: null,
      name: fileName,
      file: null,
      content: fileContent,
      errors: null,
      status: finalStatus,
      tableDataStatus: TABLE_DATA_STATUS.PARSING,
    });
    const agGridData = _generateGridDataFromCSV(fileContent, parameterData, options);
    if (agGridData.error) {
      if (clientFileDescriptorRestoreValue) {
        setClientFileDescriptor({
          ...clientFileDescriptorRestoreValue,
          errors: agGridData.error,
        });
      } else {
        setClientFileDescriptor({
          errors: agGridData.error,
          tableDataStatus: TABLE_DATA_STATUS.ERROR,
        });
      }
    } else {
      setClientFileDescriptor({
        agGridRows: agGridData.rows,
        agGridColumns: agGridData.cols,
        name: fileName,
        file: null,
        content: fileContent,
        errors: agGridData.error,
        status: finalStatus,
        tableDataStatus: TABLE_DATA_STATUS.READY,
        uploadPreprocess: null,
      });
    }
  };

  const _readAndParseCSVFile = (
    file,
    clientFileDescriptor,
    setClientFileDescriptor,
    clientFileDescriptorRestoreValue
  ) => {
    if (!file) {
      return;
    }

    setClientFileDescriptor({
      agGridRows: null,
      name: file.name,
      file: null,
      content: null,
      errors: null,
      status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
      tableDataStatus: TABLE_DATA_STATUS.UPLOADING,
    });
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      const finalStatus = UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD;
      _parseCSVFileContent(
        fileContent,
        file.name,
        clientFileDescriptor,
        setClientFileDescriptor,
        finalStatus,
        clientFileDescriptorRestoreValue
      );
    };

    reader.readAsText(file);
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

  const exportCSV = (event) => {
    const fileName = parameterId.concat('.csv');
    const fileContent = AgGridUtils.toCSV(parameter.agGridRows, parameter.agGridColumns, options);
    FileBlobUtils.downloadFileFromData(fileContent, fileName);
  };

  const _readAndParseXLSXFile = async (
    file,
    clientFileDescriptor,
    setClientFileDescriptor,
    clientFileDescriptorRestoreValue
  ) => {
    if (!file) {
      return;
    }
    setClientFileDescriptor({
      agGridRows: null,
      name: file.name,
      file,
      content: null,
      errors: null,
      status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
      tableDataStatus: TABLE_DATA_STATUS.PARSING,
    });

    const agGridData = await _generateGridDataFromXLSX(file, parameterData, options);
    if (agGridData.error) {
      if (clientFileDescriptorRestoreValue) {
        setClientFileDescriptor({
          ...clientFileDescriptorRestoreValue,
          errors: agGridData.error,
        });
      } else {
        setClientFileDescriptor({
          errors: agGridData.error,
          tableDataStatus: TABLE_DATA_STATUS.ERROR,
        });
      }
    } else {
      const newFileContent = AgGridUtils.toCSV(agGridData.rows, parameterData.columns, options);
      setClientFileDescriptor({
        agGridRows: agGridData.rows,
        name: file.name,
        file: null,
        content: newFileContent,
        errors: agGridData.error,
        status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
        tableDataStatus: TABLE_DATA_STATUS.READY,
        uploadPreprocess: null,
      });
    }
  };

  const importFile = (event) => {
    // TODO: ask confirmation if data already exist
    const previousFileBackup = clone(parameter);
    const file = FileManagementUtils.prepareToUpload(event, parameter, setParameterInState);
    if (file.name.endsWith('.csv')) {
      _readAndParseCSVFile(file, parameter, setParameterInState, previousFileBackup);
    } else if (file.name.endsWith('.xlsx')) {
      _readAndParseXLSXFile(file, parameter, setParameterInState, previousFileBackup);
    } else {
      setParameterInState({
        errors: [{ summary: 'Unknown file type, please provide a CSV or XLSX file.', loc: file.name }],
      });
    }
  };

  const csvImportButton = (
    <Button
      key="import-file-button"
      data-cy="import-file-button"
      disabled={!context.editMode}
      variant="outlined"
      component="label"
      onChange={importFile}
    >
      {t('genericcomponent.table.button.fileImport')}
      <input type="file" accept=".csv, .xlsx" hidden />
    </Button>
  );

  const csvExportButton = (
    <Button
      style={{ marginLeft: '16px' }}
      key="export-csv-button"
      data-cy="export-csv-button"
      variant="outlined"
      component="label"
      onClick={exportCSV}
    >
      {t('genericcomponent.table.button.csvExport')}
    </Button>
  );

  // eslint-disable-next-line no-unused-vars
  const extraToolbarActions = [csvImportButton, csvExportButton];

  return (
    <Table
      key={parameterId}
      data-cy={parameterData.dataCy}
      labels={labels}
      dateFormat={dateFormat}
      editMode={context.editMode}
      dataStatus={parameter.tableDataStatus}
      errors={parameter.errors}
      columns={parameter.agGridColumns || columns}
      rows={parameter.agGridRows || []}
      agTheme={context.isDarkTheme ? theme.gridDark.agTheme : theme.gridLight.agTheme}
      // extraToolbarActions={extraToolbarActions}
      onCellChange={onCellChange}
      onClearErrors={onClearErrors}
      buildErrorsPanelTitle={buildErrorsPanelTitle}
    />
  );
};

AzureFunctionTableFactory.propTypes = {
  parameterData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
