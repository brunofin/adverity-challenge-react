import DataActions from "../actions/DataActions";
import DataAction from "../../interfaces/actions/DataAction";
import IDataState from "../../interfaces/flux/IDataState";

const initialState: IDataState = {
    loading: false,
    data: []
};

export default function DataReducer(state: IDataState = initialState, action: DataAction): IDataState {
    switch (action.type) {
        case DataActions.REQUEST_DATA:
            return Object.assign({}, state, { loading: true });

        case DataActions.RECEIVE_DATA:
            return Object.assign({}, state, { loading: false, data: [...action.data] });

        default:
            return state;
    }
};
