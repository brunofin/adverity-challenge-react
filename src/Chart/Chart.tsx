import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../flux/Reducer';
import ChartDataManipulationService from '../services/ChartDataManipulationService';

export default function Chart(): JSX.Element | null {
    const isLoading = useSelector((state: ApplicationState) => state.data.loading);
    const relationships = useSelector((state: ApplicationState) => state.data.data.relationships);
    const selectedSources = useSelector((state: ApplicationState) => state.filter.selectedSources);
    const selectedCampaigns = useSelector((state: ApplicationState) => state.filter.selectedCampaigns);

    const chartManipulationService = new ChartDataManipulationService(relationships, selectedSources, selectedCampaigns);
    const data = chartManipulationService.parseData();

    return isLoading ? null : (
        <div className="Chart">
            <Line data={data} />
        </div>
    );
};
