import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../flux/Reducer';
import * as _ from 'lodash';
import DatasourceCampaignStatistic from '../models/DatasourceCampaignStatistic';

export default function Chart(): JSX.Element | null {
    const isLoading = useSelector((state: ApplicationState) => state.data.loading);

    const relationships = useSelector((state: ApplicationState) => state.data.data.relationships);
    const selectedSources = useSelector((state: ApplicationState) => state.filter.selectedSources);
    const selectedCampaigns = useSelector((state: ApplicationState) => state.filter.selectedCampaigns);

    const group = _.chain(relationships)
        .filter(o => {
            if (selectedSources.length ) {
                return _.some(selectedSources, datasource => o.getDatasource() === datasource);
            } else {
                return true;
            }
        })
        .filter(o => {
            if (selectedCampaigns.length) {
                return _.some(selectedCampaigns, campaign => o.getCampaign() === campaign);
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

    const mock = {
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

    return isLoading ? null : (
        <div className="Chart">
            <Line data={mock} />
        </div>
    );
};
