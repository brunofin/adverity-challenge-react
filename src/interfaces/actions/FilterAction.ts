import { Action } from "redux";
import Campaign from "../../models/Campaign";
import Datasource from "../../models/Datasource";

export default interface FilterAction extends Action {
    dataSource?: Datasource;
    dataSources?: Datasource[];
    campaign?: Campaign;
    campaigns?: Campaign[];
};
