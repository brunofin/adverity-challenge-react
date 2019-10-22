import FilterAction from "../../interfaces/actions/FilterAction";

enum FiltersActions {
    SELECT_DATA_SOURCE = 'SELECT_DATA_SOURCE',
    SELECT_CAMPAIGN = 'SELECT_CAMPAIGN',
    REMOVE_DATA_SOURCE = 'REMOVE_DATA_SOURCE',
    REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN',
    SET_SELECTED_DATA_SOURCES = 'SET_SELECTED_DATA_SOURCES',
    SET_SELECTED_CAMPAIGNS = 'SET_SELECTED_CAMPAIGNS',
}

export default FiltersActions;

export class FiltersActionCreators {

    public static setSelectedDataSources(dataSources: string[]): FilterAction {
        return {
            type: FiltersActions.SET_SELECTED_DATA_SOURCES,
            dataSources
        };
    }

    public static setSelectedCampaigns(campaigns: string[]): FilterAction {
        return {
            type: FiltersActions.SET_SELECTED_CAMPAIGNS,
            campaigns
        };
    }

    public static selectDataSource(dataSource: string): FilterAction {
        return {
            type: FiltersActions.SELECT_DATA_SOURCE,
            dataSource
        };
    }

    public static selectCampaign(campaign: string): FilterAction {
        return {
            type: FiltersActions.SELECT_CAMPAIGN,
            campaign
        }
    }

    public static deselectDataSource(dataSource: string): FilterAction {
        return {
            type: FiltersActions.REMOVE_DATA_SOURCE,
            dataSource
        };
    }

    public static deselectCampaign(campaign: string): FilterAction {
        return {
            type: FiltersActions.REMOVE_CAMPAIGN,
            campaign
        }
    }
};
