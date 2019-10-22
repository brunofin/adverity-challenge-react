// based on my model sketch from `model-diagram-sketch.png`
export default class Campaign {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}
