import Datasource from "../../models/Datasource";
import Campaign from "../../models/Campaign";

export default interface IFilterState {
    selectedSources: Array<Datasource>;
    selectedCampaigns: Array<Campaign>;
};
