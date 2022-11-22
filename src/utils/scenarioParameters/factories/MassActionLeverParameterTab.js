import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PermissionsGate } from '../../../components';
import { FileUpload } from '../../../components/Supplychain/tabs';

const noPermissionsPlaceHolder = (t) => {
  return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
};

export const MassActionLeverParameterTab = ({ parametersGroupData, parametersState, setParametersState, context }) => {
  const { t } = useTranslation();
  const file = parametersState?.mass_lever_excel_file;
  const setFile = (newValue) => {
    setParametersState({
      ...parametersState,
      mass_lever_excel_file: newValue,
    });
  };
  const datasetId = file?.id;
  const acceptedFileTypesToUpload = parametersGroupData.parameters[0].defaultFileTypeFilter;

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      authorizedRoles={parametersGroupData.authorizedRoles}
    >
      <FileUpload
        file={file}
        setFile={setFile}
        datasetId={datasetId}
        acceptedFileTypesToUpload={acceptedFileTypesToUpload}
        editMode={context.editMode}
        scenario={context.currentScenario}
        workspaceId={context?.workspaceId}
      />
    </PermissionsGate>
  );
};

MassActionLeverParameterTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  parametersState: PropTypes.object.isRequired,
  setParametersState: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};
