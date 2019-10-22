import CSVProcessor from "./CSVProcessor";
import { IMappedData } from "../interfaces/flux/IDataState";

export default class DataAPIService {
    public async getData(): Promise<IMappedData> {
        const response = await fetch('./data/data.csv');
        return CSVProcessor.parse(await response.text());
    }
}
