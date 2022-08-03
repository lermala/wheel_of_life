export class MenuWheel {
    // general
    menu = document.querySelector('.menuWheel');
    BLOCK_CLASS_NAME = '.menuWheel__block';

    // sectors constants
    SECTORS_TABLE = document.querySelector('.tableSectors');
    SECTORS_TRS = this.SECTORS_TABLE.querySelectorAll('tr');
    COL_COLOR_ID = 0;
    COL_NAME_ID = 1;
    COL_SCORE_ID = 2;
    COL_MAXSCORE_ID = 3;
    COL_BTN_ID = 4;
    // sectors info
    sectors;
    maxScore;
    toChange;
    toDelete;

    // canvas view info
    // circlesIsDrawn

    constructor(option) {
        this.updateDOM(); // todo

        this.sectors = option.sectors;
        this.maxScore = option.maxScore;
        this.toChange = option.toChange;
        this.toDelete = option.toDelete;
    }

    drawSectors() {
        this.clearSectors();
        this.sectors.forEach((el) => {
            this.addSector(el, this.toChange, this.toDelete); // draw
            // this.addSectorEvents(toChange, toDelete);
            console.log(el);
        });
    }

    addSector(sector, toChange, toDelete) {
        // заполняем строку таблицы
        const rowSector = document.createElement('tr');

        // цвет
        const tdColor = document.createElement('td');
        tdColor.className = 'coloredCircle';
        tdColor.style.background = sector.color;

        // название
        const tdName = document.createElement('td');

        const inputName = document.createElement('input');
        inputName.type = "text";
        inputName.value = sector.name;
        inputName.placeholder = "Впишите сферу"; // todo     
        // todo check on empty input
        inputName.className = "input-sector";
        tdName.appendChild(inputName);

        // счет
        const tdScore = document.createElement('td');
        tdScore.textContent = sector.score;

        // max счет
        const tdMaxScore = document.createElement('td');
        tdMaxScore.textContent = '/' + this.maxScore; // todo

        // кнопка // todo
        const tdBtn = document.createElement('td');
        tdBtn.textContent = '—';

        // вставляем в строку
        rowSector.appendChild(tdColor);
        rowSector.appendChild(tdName);
        rowSector.appendChild(tdScore);
        rowSector.appendChild(tdMaxScore);
        rowSector.appendChild(tdBtn);

        // вставляем сектор
        this.SECTORS_TABLE.appendChild(rowSector);

        // добавляем события // todo
        inputName.addEventListener('change', function () {
            const newName = inputName.value;
            toChange(sector.id, newName);
        });
        tdBtn.addEventListener('click', function () {
            toDelete(sector.id);
        });

        this.updateDOM();
    }

    updateScore(id, newScore) {        
        const sectorRow = this.getSectorRow(id);
        const sectorTd = sectorRow.querySelectorAll('td')[this.COL_SCORE_ID]; // todo
    
        // updating sector
        sectorTd.textContent = newScore;
    }

    updateAllMaxScore(newScore) {       
        this.SECTORS_TRS.forEach(el => {
            const tdMaxScore = el.querySelectorAll('td')[this.COL_MAXSCORE_ID];
            tdMaxScore.textContent = "/" + newScore;
        });        
    }

    focusLastInput(){        
        const sectorRow = this.getSectorRow(this.sectors.length - 1);
        const sectorTd = sectorRow.querySelectorAll('td')[this.COL_NAME_ID];
        sectorTd.querySelector('input').focus();
    }

    getSectorRow(id) {        
        return this.SECTORS_TABLE.querySelectorAll('tr')[id];
    }

    clearSectors() {
        this.SECTORS_TRS.forEach(element => element.remove());
    }

    setParamerers(balanceWheel){
        const circle_chb = document.querySelector('#circles');
        circle_chb.checked = balanceWheel.areCirclesShown;
        const maxScore_inp = document.querySelector('#maxScore');
        maxScore_inp.value = balanceWheel.maxScore;
    }

    getParameters(balanceWheel, action) {
        const circle_chb = document.querySelector('#circles');
        circle_chb.addEventListener('change', function () {
            balanceWheel.areCirclesShown = circle_chb.checked;
            action();
        }); 

        const titles_chb = document.querySelector('#titles');
        titles_chb.addEventListener('change', function () {
            balanceWheel.areTitlesShown = titles_chb.checked;
            action();
        }); 

        const maxScore_inp = document.querySelector('#maxScore');
        maxScore_inp.addEventListener('change', function () {
            // balanceWheel.maxScore = maxScore_inp.value;   
            balanceWheel.updateMaxScore(maxScore_inp.value);
            action();
        }); 
    }

    drawPallete(palette){
        const paletteBlock = document.querySelector('.palette');
        paletteBlock.addEventListener('click', function() {
            console.log("girgirjgrg");
        });
        // palette.colors.forEach(el => {
        //     const colorBlock = document.createElement('div');
        //     colorBlock.className = 'palette__color';            
        //     colorBlock.style.background = el;
        //     paletteBlock.appendChild(colorBlock);
        // });
        for (let i = 0; i < 6; i++){
            const colorBlock = document.createElement('div');
            colorBlock.className = 'palette__color';            
            colorBlock.style.background = palette.colors[i];
            paletteBlock.appendChild(colorBlock);            
        }
    }

    updateDOM() {
        this.SECTORS_TABLE = document.querySelector('.tableSectors');
        this.SECTORS_TRS = this.SECTORS_TABLE.querySelectorAll('tr');
    }

    updateData(sectors) {
        this.sectors = sectors;
    }
}