import IFilterState from "../../interfaces/flux/IFilterState";
import DataAction from "../../interfaces/actions/DataAction";
import FiltersActions from "../actions/FiltersActions";
import FilterAction from "../../interfaces/actions/FilterAction";

const initialState: IFilterState = {
    selectedSources: [],
    selectedCampaigns: [],
};

export default function FiltersReducer(state: IFilterState = initialState, action: FilterAction | DataAction): IFilterState {
    switch (action.type) {

        case FiltersActions.SELECT_CAMPAIGN: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.campaign && !state.selectedCampaigns.includes(filterAction.campaign)) {
                const selectedCampaigns = [...state.selectedCampaigns];
                selectedCampaigns.push(filterAction.campaign)
                return Object.assign({}, state, { selectedCampaigns });
            } else {
                return state;
            }

        }

        case FiltersActions.SELECT_DATA_SOURCE: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.dataSource && !state.selectedSources.includes(filterAction.dataSource)) {
                const selectedSources = [...state.selectedSources];
                selectedSources.push(filterAction.dataSource);
                return Object.assign({}, state, { selectedSources });
            } else {
                return state;
            }

        }

        case FiltersActions.REMOVE_CAMPAIGN: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.campaign) {
                const selectedCampaigns = [...state.selectedCampaigns];
                const i = selectedCampaigns.indexOf(filterAction.campaign);

                if (i >= 0) {
                    selectedCampaigns.splice(i, 1);
                    return Object.assign({}, state, { selectedCampaigns });
                }
            }

            return state;
        }

        case FiltersActions.REMOVE_DATA_SOURCE: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.dataSource) {
                const selectedSources = [...state.selectedSources];
                const i = selectedSources.indexOf(filterAction.dataSource);

                if (i >= 0) {
                    selectedSources.splice(i, 1);
                    return Object.assign({}, state, { selectedSources });
                }
            }

            return state;
        }

        case FiltersActions.SET_SELECTED_CAMPAIGNS: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.campaigns) {
                return Object.assign({}, state, { selectedCampaigns: [...filterAction.campaigns] });
            } else {
                return state;
            }
        }

        case FiltersActions.SET_SELECTED_DATA_SOURCES: {
            const filterAction: FilterAction = (action as FilterAction);

            if (filterAction.dataSources) {
                return Object.assign({}, state, { selectedSources: [...filterAction.dataSources] });
            } else {
                return state;
            }
        }

        default:
            return state;
    }
};
