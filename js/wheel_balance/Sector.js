export class Sector {
    name;
    color;
    score;

    constructor(options){
        this.name = options.name || "Новая сфера";
        this.color = options.color || "#ddd";
        this.score = options.score || 0;
    }
}

