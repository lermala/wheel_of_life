export class Sector {
    id;
    name;
    color;
    score;

    constructor(options){
        this.id = options.id;
        this.name = options.name || "";
        this.color = options.color || "#ddd";
        this.score = options.score || 1;
    }
}

