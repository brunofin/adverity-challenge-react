import IData from "../model/IData";
import Datasource from "../../models/Datasource";
import Campaign from "../../models/Campaign";
import Statistic from "../../models/Statistic";
import DatasourceCampaignStatistic from "../../models/DatasourceCampaignStatistic";

export default interface IDataState {
    loading: boolean;
    data: IMappedData;
};

export interface IMappedData {
    datasources: Datasource[];
    campaigns: Campaign[];
    statistics: Statistic[];
    relationships: DatasourceCampaignStatistic[];
}