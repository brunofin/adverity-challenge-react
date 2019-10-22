import { Action } from "redux";

export default interface FilterAction extends Action {
    dataSource?: string;
    dataSources?: string[];
    campaign?: string;
    campaigns?: string[];
};
