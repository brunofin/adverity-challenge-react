import * as _ from 'lodash';
import DatasourceCampaignStatistic from '../models/DatasourceCampaignStatistic';
import Datasource from '../models/Datasource';
import Campaign from '../models/Campaign';

export default class ChartDataManipulationService {
    private relationships: DatasourceCampaignStatistic[];
    private selectedSources: Datasource[];
    private selectedCampaigns: Campaign[];

    constructor(relationships: DatasourceCampaignStatistic[], selectedSources: Datasource[], selectedCampaigns: Campaign[]) {
        this.relationships = relationships;
        this.selectedSources = selectedSources;
        this.selectedCampaigns = selectedCampaigns;
    }

    public parseData() {
        const group = _.chain(this.relationships)
            .filter(o => {
                if (this.selectedSources.length) {
                    return _.some(this.selectedSources, datasource => o.getDatasource() === datasource);
                } else {
                    return true;
                }
            })
            .filter(o => {
                if (this.selectedCampaigns.length) {
                    return _.some(this.selectedCampaigns, campaign => o.getCampaign() === campaign);
                } else {
                    return true;
                }
            })
            .sortBy(o => o.getDate())
            .groupBy(o => o.getDate() ? o.getDate()!.format('DD/MM/YYYY') : null)
            .value();

        const b = _.map(_.compact(Object.keys(group)), key => {
            const arrays: DatasourceCampaignStatistic[] = group[key];

            const { clicks, impressions } = _.reduce(arrays, (acc, current) => {
                return {
                    clicks: acc.clicks + current.getStatistic().getClicks(),
                    impressions: acc.impressions + current.getStatistic().getImpressions()
                };
            }, {
                clicks: 0,
                impressions: 0
            });

            return { clicks, impressions };
        });

        return {
            labels: _.compact(Object.keys(group)),
            datasets: [
                {
                    label: 'Clicks',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: _.map(b, o => o.clicks)
                }, {
                    label: 'Impressions',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(90,102,21,0.4)',
                    borderColor: 'rgba(90,102,21,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(90,102,21,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(90,102,21,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: _.map(b, o => o.impressions)
                }
            ]
        };
    }
}
