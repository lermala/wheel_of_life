const menu = document.querySelector('.menuWheel');
const BLOCK_CLASS_NAME = '.menuWheel__block';
const COL_COLOR_ID = 0;
const COL_NAME_ID = 1;
const COL_SCORE_ID = 2;
const COL_MAXSCORE_ID = 3;
const COL_BTN_ID = 4;



function drawMenu() {
    addBlock();
}

function addSectors() {
    // сначала вставляем блок    
    balanceWheel.sectors.forEach(el =>
        addSector(el) // вставка в меню
    );
}

export function addSectorToMenu(sector, maxScore) {
    // находим таблицу секторов  // todo!!!
    const tableSectors = document.querySelector('.tableSectors');

    // заполняем строку таблицы
    const rowSector = document.createElement('tr');

    // цвет
    const tdColor = document.createElement('td');
    tdColor.className = 'coloredCircle';
    tdColor.style.background = sector.color;

    // название
    const tdName = document.createElement('td');
    // tdName.textContent = sector.name;
    const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.value = sector.name;
    inputName.placeholder = "Название сферы"; // todo     
    // todo check on empty input
    inputName.className = "input-sector";
    tdName.appendChild(inputName);

    // счет
    const tdScore = document.createElement('td');
    tdScore.textContent = sector.score;
    // const inputScore = document.createElement('input');
    // inputScore.type = "number"; 
    // inputScore.className = "input-number";         
    // inputScore.value = sector.score;    
    // tdScore.appendChild(inputScore);  

    // max счет
    const tdMaxScore = document.createElement('td');
    tdMaxScore.textContent = '/' + maxScore; // todo

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
    tableSectors.appendChild(rowSector);
}

export function updateAllMaxScore1(maxScore) {
    const tableSectors = document.querySelector('.tableSectors');

    tableSectors.querySelectorAll('tr').forEach(el => {
        const tdMaxScore = el.querySelectorAll('td')[COL_MAXSCORE_ID];
        tdMaxScore.textContent = maxScore;
    });
}

export function addBlock() {
    const newBlock = document.createElement('div');
    newBlock.className = BLOCK_CLASS_NAME;
    menu.prepend(newBlock);
};

export function updateSectorName(id, updatedSector) {
    const sectorRow = findSectorRow(id);
    const sectorTd = sectorRow.querySelectorAll('td')[COL_NAME_ID]; // todo

    // updating sector
    sectorTd.textContent = updatedSector.name;
}

export function updateScoreInMenu(id, newScore) {
    // находим таблицу секторов  // todo!!!
    const tableSectors = document.querySelector('.tableSectors');

    // searching сектор
    // const sectorItem = document.querySelectorAll(SECTOR_CLASS_NAME)[id];
    const sectorRow = findSectorRow(id);
    const sectorTd = sectorRow.querySelectorAll('td')[COL_SCORE_ID]; // todo

    // updating sector
    sectorTd.textContent = newScore;
}

export function deleteSectorFromMenu(id) {
    const sectorItem = findSectorRow(id);  
    // const tableSectors = document.querySelector('.tableSectors'); // находим таблицу секторов     
    // const sectorItem = tableSectors.querySelectorAll('tr')[id]; 
    
    console.log(sectorItem);
    console.log(id);
    // sectorItem.remove();
    redrawSectors();
}

export function redrawSectors(sectors, maxScore){
    // clear 
    const tableSectors = document.querySelector('.tableSectors');
    const sectorTrs = tableSectors.querySelectorAll('tr'); 
    sectorTrs.forEach(element => element.remove());
    // draw
    sectors.forEach(el => addSectorToMenu(el, maxScore));
}

function getClickedRemoveId() {
    // wat?
}

function findSectorRow(id) {
    // todo?
    const tableSectors = document.querySelector('.tableSectors'); // находим таблицу секторов     
    return tableSectors.querySelectorAll('tr')[id];
}

export function addEventForSectorName(action) {
    const tableSectors = document.querySelector('.tableSectors'); // находим таблицу секторов        
    const trs = tableSectors.getElementsByTagName('tr');    
    for (let i = 0; i < trs.length; i++) {        
        const cellName = trs[i].cells[COL_NAME_ID];
        const inp = cellName.querySelector('input');
        inp.addEventListener('change', function () {            
            const newName = inp.value;
            action(i, newName);
        });         
    }
}

export function addEventForSectorBtn(action) {
    const tableSectors = document.querySelector('.tableSectors'); // находим таблицу секторов        
    const trs = tableSectors.getElementsByTagName('tr');    
    for (let i = 0; i < trs.length; i++) {        
        const cellBtn = trs[i].cells[COL_BTN_ID];        
        cellBtn.addEventListener('click', function () {                        
            action(i);           
        });         
    }
}