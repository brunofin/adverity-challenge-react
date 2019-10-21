import { Action } from "redux";

export default interface FilterAction extends Action {
    dataSource?: string;
    campaign?: string;
};
