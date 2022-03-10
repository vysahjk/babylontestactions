import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CytoViz, HierarchicalComboBox } from '@cosmotech/ui';
import { Backdrop, CircularProgress } from '@material-ui/core';
import klay from 'cytoscape-klay';
import { sortScenarioList } from '../../utils/SortScenarioListUtils';
import { STATUSES } from '../../state/commons/Constants';
import { AppInsights } from '../../services/AppInsights';
import { fetchData, processGraphElements } from './data';
import useStyles from './style';
import cytoscapeStylesheet from './styleCytoViz';

const EXTRA_LAYOUTS = {
  klay: klay,
  breadthfirst: null,
};
const appInsights = AppInsights.getInstance();

const Flowchart = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { currentScenario, scenarioList, findScenarioById, workspace } = props;
  const [graphElements, setGraphElements] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Note that the "active" variable is necessary to prevent race conditions when the effect is called several times
    // (see https://stackoverflow.com/questions/61751728 for more info)
    let active = true;
    setIsLoadingData(true);
    loadData();
    return () => {
      active = false;
    };

    async function loadData() {
      const res = await fetchData(currentScenario.data.id);
      const elements = processGraphElements(res.data);
      if (active) {
        setGraphElements(elements);
        setIsLoadingData(false);
      }
    }
  }, [currentScenario.data.id]);

  // TODO: this code is duplicated from the Scenario view. It may no longer be necessary after the scenario view
  // refactoring
  useEffect(() => {
    appInsights.setScenarioData(currentScenario.data);
  }, [currentScenario]);
  const workspaceId = workspace.data.id;
  const handleScenarioChange = (event, scenario) => {
    if (scenario.id !== currentScenario.data.id) {
      setIsLoadingData(true);
    }
    findScenarioById(workspaceId, scenario.id);
  };
  const sortedScenarioList = sortScenarioList(scenarioList.data.slice());
  const noScenario = currentScenario.data === null;
  const scenarioListDisabled = scenarioList === null || noScenario;
  const scenarioListLabel = noScenario ? null : t('views.scenario.dropdown.scenario.label', 'Scenario');
  const showBackdrop = currentScenario.status === STATUSES.LOADING;

  const cytoVizLabels = {
    elementDetails: t('commoncomponents.cytoviz.elementDetails', 'Details'),
    loading: t('commoncomponents.cytoviz.loading', 'Loading...'),
    noSelectedElement: t('commoncomponents.cytoviz.noSelectedElement', 'Select a node or edge to show its data'),
    settings: {
      compactMode: t('commoncomponents.cytoviz.settings.compactMode', 'Compact layout'),
      layout: t('commoncomponents.cytoviz.settings.layout', 'Layout'),
      title: t('commoncomponents.cytoviz.settings.title', 'Settings'),
      spacingFactor: t('commoncomponents.cytoviz.settings.spacingFactor', 'Spacing factor'),
      zoomLimits: t('commoncomponents.cytoviz.settings.zoomLimits', 'Min & max zoom'),
    },
    elementData: {
      dictKey: t('commoncomponents.cytoviz.elementData.dictKey', 'Key'),
      dictValue: t('commoncomponents.cytoviz.elementData.dictValue', 'Value'),
      noData: t('commoncomponents.cytoviz.elementData.noData', 'No data to display for this element.'),
      attributes: {},
    },
  };

  const defaultSettings = {
    layout: 'breadthfirst',
    minZoom: 0.1,
    maxZoom: 1,
    useCompactMode: true,
    spacingFactor: 1,
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={showBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.mainGrid}>
        <div className={classes.scenarioSelectGridItem}>
          <HierarchicalComboBox
            value={currentScenario.data}
            values={sortedScenarioList}
            label={scenarioListLabel}
            handleChange={handleScenarioChange}
            disabled={scenarioListDisabled}
          />
        </div>
        <div className={classes.cytoscapeGridItem}>
          <CytoViz
            cytoscapeStylesheet={cytoscapeStylesheet}
            elements={graphElements}
            labels={cytoVizLabels}
            loading={isLoadingData}
            extraLayouts={EXTRA_LAYOUTS}
            defaultSettings={defaultSettings}
          />
        </div>
      </div>
    </>
  );
};

Flowchart.propTypes = {
  currentScenario: PropTypes.object.isRequired,
  findScenarioById: PropTypes.func.isRequired,
  scenarioList: PropTypes.object.isRequired,
  workspace: PropTypes.object.isRequired,
};

export default Flowchart;
