import FilterAction from "../../interfaces/actions/FilterAction";
import Datasource from "../../models/Datasource";
import Campaign from "../../models/Campaign";

enum FiltersActions {
    SELECT_DATA_SOURCE = 'FiltersActions.SELECT_DATA_SOURCE',
    SELECT_CAMPAIGN = 'FiltersActions.SELECT_CAMPAIGN',
    REMOVE_DATA_SOURCE = 'FiltersActions.REMOVE_DATA_SOURCE',
    REMOVE_CAMPAIGN = 'FiltersActions.REMOVE_CAMPAIGN',
    SET_SELECTED_DATA_SOURCES = 'FiltersActions.SET_SELECTED_DATA_SOURCES',
    SET_SELECTED_CAMPAIGNS = 'FiltersActions.SET_SELECTED_CAMPAIGNS',
}

export default FiltersActions;

export class FiltersActionCreators {

    public static setSelectedDataSources(dataSources: Datasource[]): FilterAction {
        return {
            type: FiltersActions.SET_SELECTED_DATA_SOURCES,
            dataSources
        };
    }

    public static setSelectedCampaigns(campaigns: Campaign[]): FilterAction {
        return {
            type: FiltersActions.SET_SELECTED_CAMPAIGNS,
            campaigns
        };
    }

    public static selectDataSource(dataSource: Datasource): FilterAction {
        return {
            type: FiltersActions.SELECT_DATA_SOURCE,
            dataSource
        };
    }

    public static selectCampaign(campaign: Campaign): FilterAction {
        return {
            type: FiltersActions.SELECT_CAMPAIGN,
            campaign
        }
    }

    public static deselectDataSource(dataSource: Datasource): FilterAction {
        return {
            type: FiltersActions.REMOVE_DATA_SOURCE,
            dataSource
        };
    }

    public static deselectCampaign(campaign: Campaign): FilterAction {
        return {
            type: FiltersActions.REMOVE_CAMPAIGN,
            campaign
        }
    }
};
