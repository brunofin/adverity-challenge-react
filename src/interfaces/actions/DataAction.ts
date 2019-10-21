import { Action } from "redux";
import IData from "../model/IData";

export default interface DataAction extends Action {
    data: IData[];
};
