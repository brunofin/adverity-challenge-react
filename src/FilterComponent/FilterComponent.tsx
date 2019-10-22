import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../flux/Reducer';
import _ from 'lodash';
import Chip from '../Chip/Chip';
import './FilterComponent.scss';
import FilterComponentService from '../services/FilterComponentService';

export default function FilterComponent(): JSX.Element {
    const dispatch = useDispatch();
    const selectedSources = useSelector((state: ApplicationState) => state.filter.selectedSources);
    const selectedCampaigns = useSelector((state: ApplicationState) => state.filter.selectedCampaigns);
    const dataSources = useSelector((state: ApplicationState) => state.data.data.datasources);
    const campaigns = useSelector((state: ApplicationState) => state.data.data.campaigns);
    const relationships = useSelector((state: ApplicationState) => state.data.data.relationships);
    const isLoading = useSelector((state: ApplicationState) => state.data.loading);

    const svc = new FilterComponentService(selectedSources, selectedCampaigns, dataSources, campaigns, relationships, dispatch);

    return (
        <div className="FilterComponent">
            <section>
                <form name="sourceAndCampaignSelector">
                    <fieldset disabled={isLoading}>
                        <div>
                            <label htmlFor="sources">Data Sources</label>
                            <select name="sources" value={''} onChange={svc.handleSourcesSelect}>
                                <option value={''} disabled>Select one from the list to add</option>
                                {
                                    _.compact(_.map(dataSources, svc.dataSourcesMapper))
                                }
                            </select>
                        </div>

                        <div>
                            <label htmlFor="campaigns">Campaigns</label>
                            <select name="campaigns" value={''} onChange={svc.handleCampaignsSelect}>
                                <option value={''} disabled>Select one from the list to add</option>
                                {
                                    _.compact(
                                        _.chain(relationships)
                                            .filter(svc.campaignFilter)
                                            .uniqBy(r => r.getCampaign())
                                            .map(svc.campaignMapper)
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
                                _.map(selectedSources, source => <Chip key={source.getName()} name={source.getName()} remover={() => svc.handleSourceDeselect(source)}></Chip>) :
                                'All'
                        }
                    </section>

                    <h1>Selected Campaigns</h1>
                    <section>
                        {
                            selectedCampaigns.length ?
                                _.map(selectedCampaigns, campaign => <Chip key={campaign.getName()} name={campaign.getName()} remover={() => svc.handleCampaignDeselect(campaign)}></Chip>) :
                                'All'
                        }
                    </section>
                </div>
            </section>
        </div>
    );
};
