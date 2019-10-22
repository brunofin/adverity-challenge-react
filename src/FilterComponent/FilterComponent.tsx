import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../flux/Reducer';
import _ from 'lodash';
import { FiltersActionCreators } from '../flux/actions/FiltersActions';
import Chip from '../Chip/Chip';
import './FilterComponent.scss';
import Datasource from '../models/Datasource';
import Campaign from '../models/Campaign';
import DatasourceCampaignStatistic from '../models/DatasourceCampaignStatistic';

export default function FilterComponent(): JSX.Element {
    const dispatch = useDispatch();

    const selectedSources = useSelector((state: ApplicationState) => state.filter.selectedSources);
    const selectedCampaigns = useSelector((state: ApplicationState) => state.filter.selectedCampaigns);
    const dataSources = useSelector((state: ApplicationState) => state.data.data.datasources);
    const campaigns = useSelector((state: ApplicationState) => state.data.data.campaigns);
    const relationships = useSelector((state: ApplicationState) => state.data.data.relationships);

    const isLoading = useSelector((state: ApplicationState) => state.data.loading);

    const handleSourcesSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const datasource = _.find(dataSources, o => o.getName() === event.target.value);
        if (datasource) {
            dispatch(FiltersActionCreators.selectDataSource(datasource));
        }
    }

    const handleCampaignsSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const campaign = _.find(campaigns, o => o.getName() === event.target.value);
        if (campaign) {
            dispatch(FiltersActionCreators.selectCampaign(campaign));
        }
    }

    const handleSourceDeselect = (source: Datasource) => {
        dispatch(FiltersActionCreators.deselectDataSource(source));
    }

    const handleCampaignDeselect = (campaign: Campaign) => {
        dispatch(FiltersActionCreators.deselectCampaign(campaign));
    }

    const dataSourcesMapper = (source: Datasource) => {
        if (source && source.getName()) {
            return <option key={source.getName()}
                value={source.getName()}
                disabled={selectedSources.includes(source)}>
                {source.getName()}
            </option>;
        } else {
            return null;
        }
    }

    const campaignMapper = (relationship: DatasourceCampaignStatistic) => {
        if (relationship && relationship.getCampaign().getName()) {
            return <option key={relationship.getCampaign().getName()}
                value={relationship.getCampaign().getName()}
                disabled={selectedCampaigns.includes(relationship.getCampaign())}>
                [{relationship.getDatasource().getName()}] {relationship.getCampaign().getName()}
            </option>
        } else {
            return null;
        }
    }

    const campaignFilter = (relationship: DatasourceCampaignStatistic) => {
        // I know this can be simplified into a unique boolean expression but this way is more readable.
        if (selectedSources.length) {
            return _.some(selectedSources, datasource => relationship.getDatasource() === datasource)
        } else {
            return true;
        }
    }

    return (
        <div className="FilterComponent">
            <section>
                <form name="sourceAndCampaignSelector">
                    <fieldset disabled={isLoading}>
                        <div>
                            <label htmlFor="sources">Data Sources</label>
                            <select name="sources" value={''} onChange={handleSourcesSelect}>
                                <option value={''} disabled>Select one from the list to add</option>
                                {
                                    _.compact(_.map(dataSources, dataSourcesMapper))
                                }
                            </select>
                        </div>

                        <div>
                            <label htmlFor="campaigns">Campaigns</label>
                            <select name="campaigns" value={''} onChange={handleCampaignsSelect}>
                                <option value={''} disabled>Select one from the list to add</option>
                                {
                                    _.compact(
                                        _.chain(relationships)
                                            .filter(campaignFilter)
                                            .uniqBy(r => r.getCampaign())
                                            .map(campaignMapper)
                                            .value()
                                    )
                                }
                            </select>
                        </div>
                    </fieldset>
                </form>
            </section>

            <section>
                <div>
                    <h1>Selected Datasources</h1>
                    <section>
                        {
                            selectedSources.length ?
                                _.map(selectedSources, source => <Chip key={source.getName()} name={source.getName()} remover={() => handleSourceDeselect(source)}></Chip>) :
                                'All'
                        }
                    </section>

                    <h1>Selected Campaigns</h1>
                    <section>
                        {
                            selectedCampaigns.length ?
                                _.map(selectedCampaigns, campaign => <Chip key={campaign.getName()} name={campaign.getName()} remover={() => handleCampaignDeselect(campaign)}></Chip>) :
                                'All'
                        }
                    </section>
                </div>
            </section>
        </div>
    );
};
