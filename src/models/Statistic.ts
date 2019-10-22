// based on my model sketch from `model-diagram-sketch.png`
export default class Statistic {
    private clicks: number;
    private impressions: number;

    constructor(clicks: number, impressions: number) {
        this.clicks = clicks;
        this.impressions = impressions;
    }

    public getClicks(): number {
        const parsed = Number.parseInt(this.clicks as any);
        if (!Number.isNaN(parsed)) {
            return parsed;
        } else {
            return 0;
        }
    }

    public getImpressions(): number {
        const parsed = Number.parseInt(this.impressions as any);
        if (!Number.isNaN(parsed)) {
            return parsed;
        } else {
            return 0;
        }
    }
}
