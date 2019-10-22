import { Dispatch, Action, AnyAction } from "redux";
import DataAPIService from "../../services/DataAPIService";
import { IMappedData } from "../../interfaces/flux/IDataState";

enum DataActions {
    REQUEST_DATA = 'DataActions.REQUEST_DATA',
    RECEIVE_DATA = 'DataActions.RECEIVE_DATA',
}

export default DataActions;

export class DataActionCreators {
    public static requestData(): Action {
        return {
            type: DataActions.REQUEST_DATA
        };
    }

    public static receiveData(data: IMappedData): AnyAction {
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
