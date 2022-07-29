import { Sector } from './Sector.js'

export class BalanceWheel {
    name = "fef";
    numberOfSectors; // количество делений или сфер
    maxScore; // максимальный балл сектора / сферы
    sectors = Array();

    defaultSectors = [
        new Sector("love", "#8d9496", this.maxScore),
        new Sector("family", "#8d9496", this.maxScore),
        new Sector("money", "#8d9496", this.maxScore),
        new Sector("social", "#8d9496", this.maxScore),
        new Sector("hobby", "#8d9496", this.maxScore),
    ]

    constructor(options){
        this.name = options.name || "balance wheel";        
        this.name = "balance wheel";        
        this.maxScore = options.maxScore || 10;
        this.sectors = options.sectors || this.defaultSectors;
        this.numberOfSectors = this.sectors.length;
    }

    getSectorDegrees(){
        return 360 / this.numberOfSectors;
    }
}