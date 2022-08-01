import { Sector } from './Sector.js'

export class BalanceWheel {
    name = "fef";
    numberOfSectors; // количество делений или сфер
    maxScore; // максимальный балл сектора / сферы
    sectors;

    radius; // радиус одной окружности
    maxRadius; // радиус наибольшей окружности
    sectorDegrees; // градусы сектора

    colors = [ // todo delete
        "#66C5CC",
        "#F6CF71",
        "#F89C74",
        "#DCB0F2",
        "#87C55F",
        "#9EB9F3",
        "#FE88B1",
        "#C9DB74",
        "#8BE0A4",
        "#B497E7",
        "#D3B484",
        "#B3B3B3"
    ];

    defaultSectors = [
        new Sector({ name: "Любовь", color: this.colors[0], score: 1 }),
        new Sector({ name: "Личностный рост", color: this.colors[1], score: 2 }),
        new Sector({ name: "Социальная активность", color: this.colors[2], score: 3 }),
        new Sector({ name: "Финансы", color: this.colors[3], score: 2 }),
        new Sector({ name: "Хобби, увлечения", color: this.colors[4], score: 2 }),
        new Sector({ name: "Здоровье и спорт", color: this.colors[5], score: 2 }),
    ]

    constructor(options) {
        this.name = options.name || "balance wheel";
        this.maxScore = options.maxScore || 8;
        this.sectors = options.sectors || this.defaultSectors;        

        this.radius = this.radius || 30;
        this.recount();
    }

    recount(){
        this.numberOfSectors = this.sectors.length;
        this.maxRadius = this.radius * this.maxScore;
        this.sectorDegrees = 2 * Math.PI / this.numberOfSectors;
    }

    getSectorDegrees() {
        return 360 / this.numberOfSectors;
    }

    addSector(sector) {
        this.sectors.push(sector);
    }

    deleteSector(id) {
        const index = this.sectors.indexOf(id);
        if (index > -1) { // only splice array when item is found
            this.sectors.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    changeSector(id, newSector) {
        this.sectors[id] = newSector;
    }
}