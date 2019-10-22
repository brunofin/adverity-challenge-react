import { combineReducers } from "redux";
import DataReducer from './reducers/DataReducer';
import FiltersReducer from './reducers/FiltersReducer';
import IFilterState from "../interfaces/flux/IFilterState";
import IDataState from "../interfaces/flux/IDataState";

export interface ApplicationState {
    data: IDataState;
    filter: IFilterState;
};

export default combineReducers({
    data: DataReducer,
    filter: FiltersReducer
});
