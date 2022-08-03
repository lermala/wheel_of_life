import { Sector } from './Sector.js'

export class BalanceWheel {
    name = "fef";
    numberOfSectors; // количество делений или сфер
    maxScore; // максимальный балл сектора / сферы
    sectors;

    radius; // радиус одной окружности
    maxRadius; // радиус наибольшей окружности
    sectorDegrees; // градусы сектора

    // внешний вид
    areTitlesShown;
    areCirclesShown;
    isColored;
    palette;

    constructor(options) {
        // внешний вид
        this.areTitlesShown = options.areTitlesShown || false;
        this.areCirclesShown = options.areCirclesShown || true;
        this.isColored = options.isColored || true;
        this.palette = options.palette;

        this.name = options.name || "balance wheel";
        this.maxScore = options.maxScore || 8;
        this.sectors = options.sectors || [
            new Sector({ id: 0, name: "Любовь", color: this.palette.colors[0], score: 1 }),
            new Sector({ id: 1, name: "Личностный рост", color: this.palette.colors[1], score: 2 }),
            new Sector({ id: 2, name: "Соц. активность", color: this.palette.colors[2], score: 3 }),
            new Sector({ id: 3, name: "Финансы", color: this.palette.colors[3], score: 2 }),
            new Sector({ id: 4, name: "Хобби, увлечения", color: this.palette.colors[4], score: 2 }),
            //new Sector({ id: 5, name: "Здоровье и спорт", color: this.colors[5], score: 2 }),
        ];

        this.radius = this.radius || 30; // todo
        this.recount();
    }

    recount() {
        this.numberOfSectors = this.sectors.length;
        this.maxRadius = this.radius * this.maxScore;
        this.sectorDegrees = 2 * Math.PI / this.numberOfSectors;
    }

    updateMaxScore(maxScore) {
        this.maxScore = maxScore;
        this.sectors.forEach((element, index) => {
            if (parseInt(element.score) > parseInt(maxScore)) { // i hate js
                element.score = maxScore;
            }
        });
    }

    getSectorDegrees() {
        return 360 / this.numberOfSectors;
    }

    addSector(sector) {
        let lastId = -1;
        if (this.sectors.length > 0) lastId = this.sectors[this.sectors.length - 1].id;
        sector.id = lastId + 1;
        sector.color = this.palette.colors[(lastId + 1) % (this.palette.colors.length - 1)];
        this.sectors.push(sector);
    }

    deleteSector(id) {
        this.sectors.forEach((element, index) => {
            if (element.id == id) {
                this.sectors.splice(index, 1); // 2nd parameter means remove one item only
            }
        });

        //console.log(this.sectors);
    }

    changeSectorName(id, newName) {
        // this.sectors[id] = newSector;

        this.sectors.forEach((element, index) => {
            if (element.id == id) {
                this.sectors[index].name = newName;
            }
        });
    }

    applyPalette(palette) {
        this.palette = palette;
        this.sectors.forEach((element, index) => {
            sector.color = palette.colors[(index) % (this.palette.colors.length - 1)];
        });

    }

}