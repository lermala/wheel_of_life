export class Sector {
    name;
    color;
    score;

    constructor(options){
        this.name = options.name;
        this.color = options.color;
        this.score = options.score || 0;
    }
}

