import CSVProcessor from "./CSVProcessor";

export default class DataAPIService {
    public async getData() {
        const response = await fetch('./data/data.csv');
        return CSVProcessor.parse(await response.text());
    }
}