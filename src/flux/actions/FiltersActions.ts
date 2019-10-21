import FilterAction from "../../interfaces/actions/FilterAction";

enum FiltersActions {
    SELECT_DATA_SOURCE,
    SELECT_CAMPAIGN,
    REMOVE_DATA_SOURCE,
    REMOVE_CAMPAIGN
}

export default FiltersActions;

export class FiltersActionCreators {

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
