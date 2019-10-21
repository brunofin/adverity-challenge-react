import moment from 'moment';
import IData from '../interfaces/model/IData';

export default class CSVProcessor {
    private static lineBreakSymbol: RegExp = /\r\n|\n/;

    public static parse(csv: string): IData[] {
        const lines: string[] = csv.split(CSVProcessor.lineBreakSymbol);

        const [, ...data] = lines;
        const propsMap = lines[0].split(',');

        return data.map(line => {
            return Object.assign(
                {},
                ...line.split(',')
                    .map((value, i) => {
                        return {
                            [propsMap[i].toLowerCase()]: CSVProcessor.tryToAddTypingToValue(value.trim())
                        };
                    })
            );
        })
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

        if(!Number.isNaN(numeric)) {
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