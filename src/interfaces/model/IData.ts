import { Moment } from "moment";

export default interface IData {
    date: Moment;
    datasource: string;
    campaign: string;
    impressions: number;
};
