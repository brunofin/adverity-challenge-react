import moment from 'moment';
import IData from '../interfaces/model/IData';
import * as _ from 'lodash';
import Campaign from '../models/Campaign';
import Datasource from '../models/Datasource';
import Statistic from '../models/Statistic';
import { IMappedData } from '../interfaces/flux/IDataState';
import DatasourceCampaignStatistic from '../models/DatasourceCampaignStatistic';

export default class CSVProcessor {
    private static lineBreakSymbol: RegExp = /\r\n|\n/;

    public static parse(csv: string): IMappedData {
        const lines: string[] = csv.split(CSVProcessor.lineBreakSymbol);

        const [, ...data] = lines;
        const propsMap = lines[0].split(',');

        const rawData: IData[] = _.compact(_.map(data, line => {
            return Object.assign(
                {},
                ...line.split(',')
                    .map((value, i) => {
                        return {
                            [propsMap[i].toLowerCase()]: CSVProcessor.tryToAddTypingToValue(value.trim())
                        };
                    })
            );
        }));

        const datasources: Datasource[] = [];
        const campaigns: Campaign[] = [];
        const statistics: Statistic[] = [];
        const relationships: DatasourceCampaignStatistic[] = [];

        _.each(
            _.uniqBy(rawData, o => o.datasource),
            ({ datasource }) => {
                const d = new Datasource(datasource);
                datasources.push(d);
            }
        );

        _.each(
            _.uniqBy(rawData, o => o.campaign),
            ({ campaign }) => {
                const c = new Campaign(campaign);
                campaigns.push(c);
            }
        )

        _.each(rawData, data => {
            const campaign = _.find(campaigns, c => c.getName() === data.campaign);
            const datasource = _.find(datasources, c => c.getName() === data.datasource);

            if (campaign && datasource) {
                const statistic = new Statistic(data.clicks, data.impressions);
                statistics.push(statistic);

                const relationship: DatasourceCampaignStatistic = new DatasourceCampaignStatistic(datasource, campaign, statistic, data.date);
                relationships.push(relationship);
            }
        });

        return {
            datasources,
            campaigns,
            statistics,
            relationships
        };
    }

    private static tryToAddTypingToValue(value: string): any {
        const split = value.split('.');

        let numeric: number;
        if (split.length === 1) {
            numeric = Number.parseFloat(value)
        } else if (split.length === 0) {
            numeric = Number.parseInt(value);
        } else {
            numeric = NaN;
        }

        if (!Number.isNaN(numeric)) {
            return numeric;
        }

        if (value.toLowerCase() === 'true') {
            return true;
        } else if (value.toLowerCase() === 'false') {
            return false;
        }

        if (split.length === 3 && split[0].length <= 2 && split[1].length <= 2 && split[2].length <= 4) {
            return moment(value, 'DD.MM.YYYY');
        }

        return value;
    }
}
