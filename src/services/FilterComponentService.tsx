import React, { ChangeEvent } from 'react';
import Datasource from "../models/Datasource";
import Campaign from "../models/Campaign";
import DatasourceCampaignStatistic from "../models/DatasourceCampaignStatistic";
import { Dispatch } from "redux";
import _ from 'lodash';
import { FiltersActionCreators } from "../flux/actions/FiltersActions";

export default class FilterComponentService {
    private selectedSources: Datasource[];
    private selectedCampaigns: Campaign[];
    private dataSources: Datasource[];
    private campaigns: Campaign[];
    private relationships: DatasourceCampaignStatistic[];
    private dispatch: Dispatch<any>;

    constructor(selectedSources: Datasource[],
        selectedCampaigns: Campaign[],
        dataSources: Datasource[],
        campaigns: Campaign[],
        relationships: DatasourceCampaignStatistic[],
        dispatch: Dispatch<any>
    ) {
        this.selectedSources = selectedSources;
        this.selectedCampaigns = selectedCampaigns;
        this.dataSources = dataSources;
        this.campaigns = campaigns;
        this.relationships = relationships;
        this.dispatch = dispatch;
    }

    public handleSourcesSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const datasource = _.find(this.dataSources, o => o.getName() === event.target.value);
        if (datasource) {
            this.dispatch(FiltersActionCreators.selectDataSource(datasource));
        }
    }

    public handleCampaignsSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const campaign = _.find(this.campaigns, o => o.getName() === event.target.value);
        if (campaign) {
            this.dispatch(FiltersActionCreators.selectCampaign(campaign));
        }
    }

    public handleSourceDeselect = (source: Datasource) => {
        this.dispatch(FiltersActionCreators.deselectDataSource(source));
    }

    public handleCampaignDeselect = (campaign: Campaign) => {
        this.dispatch(FiltersActionCreators.deselectCampaign(campaign));
    }

    public dataSourcesMapper = (source: Datasource) => {
        if (source && source.getName()) {
            return <option key={source.getName()}
                value={source.getName()}
                disabled={this.selectedSources.includes(source)}>
                {source.getName()}
            </option>;
        } else {
            return null;
        }
    }

    public campaignMapper = (relationship: DatasourceCampaignStatistic) => {
        if (relationship && relationship.getCampaign().getName()) {
            return <option key={relationship.getCampaign().getName()}
                value={relationship.getCampaign().getName()}
                disabled={this.selectedCampaigns.includes(relationship.getCampaign())}>
                [{relationship.getDatasource().getName()}] {relationship.getCampaign().getName()}
            </option>
        } else {
            return null;
        }
    }

    public campaignFilter = (relationship: DatasourceCampaignStatistic) => {
        // I know this can be simplified into a unique boolean expression but this way is more readable.
        if (this.selectedSources.length) {
            return _.some(this.selectedSources, datasource => relationship.getDatasource() === datasource)
        } else {
            return true;
        }
    }
}
