import Datasource from "./Datasource";
import moment from "moment";
import Campaign from "./Campaign";
import Statistic from "./Statistic";

export default class DatasourceCampaignStatistic {
    private date: moment.Moment;
    private datasource: Datasource
    private campaign: Campaign;
    private statistic: Statistic;

    constructor(datasource: Datasource, campaign: Campaign, statistic: Statistic, date: moment.Moment) {
        this.campaign = campaign;
        this.datasource = datasource;
        this.statistic = statistic;
        this.date = date;
    }

    public getCampaign(): Campaign {
        return this.campaign;
    }

    public getDate(): moment.Moment | null {
        if (moment.isMoment(this.date)) {
            return this.date;
        } else {
            const convert = moment(this.date);

            if (convert.isValid()) {
                return convert;
            } else {
                return null;
            }
        }
    }

    public getDatasource(): Datasource {
        return this.datasource;
    }

    public getStatistic(): Statistic {
        return this.statistic;
    }
}
