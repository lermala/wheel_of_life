export class Sector {
    name;
    color;
    score;

    constructor(options){
        this.name = options.name || "Новый";
        this.color = options.color || "#000";
        this.score = options.score || 0;
    }
}

