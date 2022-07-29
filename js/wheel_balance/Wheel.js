import { Sector } from './Sector.js'

export class BalanceWheel {
    name = "fef";
    numberOfSectors; // количество делений или сфер
    maxScore; // максимальный балл сектора / сферы
    sectors;

    defaultSectors = [
        new Sector({name: "love", color: "#8d9496", score: 1}),
        new Sector({name: "love", color: "#8d9496", score: 2}),
        new Sector({name: "love", color: "#8d9496", score: 3}),
        new Sector({name: "love", color: "#8d9496", score: 2}),
    ]

    constructor(options){
        this.name = options.name || "balance wheel";       
        this.maxScore = options.maxScore || 3;
        this.sectors = options.sectors || this.defaultSectors; 
        console.log(this.defaultSectors);       
        this.numberOfSectors = this.sectors.length;
    }

    getSectorDegrees(){
        return 360 / this.numberOfSectors;
    }
}