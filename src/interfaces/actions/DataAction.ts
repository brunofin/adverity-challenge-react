import { Action } from "redux";
import { IMappedData } from "../flux/IDataState";

export default interface DataAction extends Action {
    data: IMappedData;
};
