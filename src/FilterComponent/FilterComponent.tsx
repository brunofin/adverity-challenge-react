import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../flux/Reducer';
import * as _ from 'lodash';
import { FiltersActionCreators } from '../flux/actions/FiltersActions';
import Chip from '../Chip/Chip';
import './FilterComponent.scss';

export default function FilterComponent(): JSX.Element {
    const dispatch = useDispatch();

    const selectedSources = useSelector((state: ApplicationState) => state.filter.selectedSources);
    const selectedCampaigns = useSelector((state: ApplicationState) => state.filter.selectedCampaigns);
    const dataSources = useSelector((state: ApplicationState) => state.filter.dataSources);
    const campaigns = useSelector((state: ApplicationState) => state.filter.campaigns);
    const isLoading = useSelector((state: ApplicationState) => {
        console.log(state.data);
        return state.data.loading
    });

    const handleSourcesSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(FiltersActionCreators.selectDataSource(event.target.value));
    }

    const handleCampaignsSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(FiltersActionCreators.selectCampaign(event.target.value));
    }

    const handleSourceDeselect = (source: string) => {
        dispatch(FiltersActionCreators.deselectDataSource(source));
    }

    const handleCampaignDeselect = (campaign: string) => {
        dispatch(FiltersActionCreators.deselectCampaign(campaign));
    }

    return (
        <div className="FilterComponent">
            <section>
                <div>
                    {
                        _.map(selectedSources, source => <Chip key={source} name={source} remover={() => handleSourceDeselect(source)}></Chip>)
                    }
                    {
                        _.map(selectedCampaigns, campaign => <Chip key={campaign} name={campaign} remover={() => handleCampaignDeselect(campaign)}></Chip>)
                    }
                </div>
            </section>
            <section>
                <form name="sourceAndCampaignSelector">
                    <fieldset disabled={isLoading}>
                        <div>
                            <label htmlFor="sources">Data Sources</label>
                            <select name="sources" value={''} onChange={handleSourcesSelect}>
                                <option value={''} disabled>Select one from the list to add</option>
                                {
                                    _.map(dataSources, source => <option key={source} value={source} disabled={selectedSources.includes(source)}>{source}</option>)
                                }
                            </select>
                        </div>

                        <div>
                            <label htmlFor="campaigns">Campaigns</label>
                            <select name="campaigns" value={''} onChange={handleCampaignsSelect}>
                                <option value={''} disabled>Select one from the list to add</option>

                                {
                                    _.map(campaigns, campaign => <option key={campaign} value={campaign} disabled={selectedCampaigns.includes(campaign)}>{campaign}</option>)
                                }
                            </select>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
};
