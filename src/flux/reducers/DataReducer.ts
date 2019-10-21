import DataActions from "../actions/DataActions";
import DataAction from "../../interfaces/actions/DataAction";
import IData from "../../interfaces/model/IData";

const initialState: IData[] = [];

export default function DataReducer(state: IData[] = initialState, action: DataAction): IData[] {
    switch (action.type) {
        case DataActions.RECEIVE_DATA: {
            return action.data;
        }

        default:
            return state;
    }
};
