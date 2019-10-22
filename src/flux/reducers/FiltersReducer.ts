import DataActions from "../actions/DataActions";
import IFilterState from "../../interfaces/flux/IFilterState";
import DataAction from "../../interfaces/actions/DataAction";
import FiltersActions from "../actions/FiltersActions";
import FilterAction from "../../interfaces/actions/FilterAction";

const initialState: IFilterState = {
    dataSources: [],
    campaigns: [],
    selectedSources: [],
    selectedCampaigns: [],
};

export default function DataReducer(state: IFilterState = initialState, action: FilterAction | DataAction): IFilterState {
    switch (action.type) {
        case DataActions.RECEIVE_DATA: {
            const dataAction: DataAction = (action as DataAction);
            const computedState = dataAction.data.reduce((acc, current) => {
                if (!acc.dataSources.includes(current.datasource)) {
                    acc.dataSources.push(current.datasource);
                }

                if (!acc.campaigns.includes(current.campaign)) {
                    acc.campaigns.push(current.campaign);
                }

                return acc;
            }, initialState);

            return Object.assign({}, state, computedState);
        }

        case FiltersActions.SELECT_CAMPAIGN: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.campaign && !state.selectedCampaigns.includes(filterAction.campaign)) {
                state.selectedCampaigns.push(filterAction.campaign)
            }

            return state;
        }

        case FiltersActions.SELECT_DATA_SOURCE: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.dataSource && !state.selectedSources.includes(filterAction.dataSource)) {
                state.selectedSources.push(filterAction.dataSource)
            }

            return state;
        }

        case FiltersActions.REMOVE_CAMPAIGN: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.campaign) {
                const i = state.selectedCampaigns.indexOf(filterAction.campaign);

                if (i >= 0) {
                    state.selectedCampaigns.splice(i, 1);
                }
            }

            return state;
        }

        case FiltersActions.REMOVE_DATA_SOURCE: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.dataSource) {
                const i = state.selectedSources.indexOf(filterAction.dataSource);

                if (i >= 0) {
                    state.selectedSources.splice(i, 1);
                }
            }

            return state;
        }

        default:
            return state;
    }
};
