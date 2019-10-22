import { Dispatch, Action, AnyAction } from "redux";
import DataAPIService from "../../services/DataAPIService";
import IData from "../../interfaces/model/IData";

enum DataActions {
    REQUEST_DATA = 'REQUEST_DATA',
    RECEIVE_DATA = 'RECEIVE_DATA',
}

export default DataActions;

export class DataActionCreators {
    public static requestData(): Action {
        return {
            type: DataActions.REQUEST_DATA
        };
    }

    public static receiveData(data: IData[]): AnyAction {
        return {
            type: DataActions.RECEIVE_DATA,
            data
        }
    }

    public static fetchData(): any {
        return async (dispatch: Dispatch) => {
            dispatch(DataActionCreators.requestData());

            const apiService: DataAPIService = new DataAPIService();
            const data = await apiService.getData();
            return dispatch(DataActionCreators.receiveData(data));
        }
    }
};
