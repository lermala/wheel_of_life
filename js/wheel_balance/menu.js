const menu = document.querySelector('.menuWheel');
const BLOCK_CLASS_NAME = '.menuWheel__block';
const COL_NAME_ID = 1;
const COL_SCORE_ID = 2;
const COL_MAXSCORE_ID = 3;



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
    tdName.textContent = sector.name;
    // счет
    const tdScore = document.createElement('td');
    tdScore.textContent = sector.score;
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

export function updateAllMaxScore(maxScore) {
    const tableSectors = document.querySelector('.tableSectors');

    tableSectors.querySelectorAll('tr').forEach(el => {
        const tdMaxScore = el.querySelectorAll('td')[COL_MAXSCORE_ID];
        tdMaxScore.textContent = maxScore;
    });
}

// old version
function addSectorToMenu2(sector, maxScore) {
    const blockSectors = menu.querySelector(BLOCK_CLASS_NAME); // берем первый блок // todo
    // создаем сектор
    const newSector = document.createElement('div');
    newSector.classList.add('menuWheel__item');
    newSector.classList.add('sectorInfo');

    // заполняем сектор
    const nameSector = document.createElement('div');
    nameSector.className = "sectorInfo__name";
    nameSector.textContent = sector.name;

    // цвет
    const colorSector = document.createElement('div');
    colorSector.className = "sectorInfo__color";
    colorSector.style.background = sector.color;

    // добавляем контейнер для цвета и названия
    const containerNameColor = document.createElement('div');
    containerNameColor.className = "containerNameColor";
    containerNameColor.append(colorSector);
    containerNameColor.append(nameSector);

    // счет
    const scoreSector = document.createElement('div');
    scoreSector.className = "sectorInfo__score";
    scoreSector.textContent = sector.score; // todo

    newSector.append(containerNameColor);
    newSector.append(scoreSector);

    // вставляем сектор
    //blockSectors.append(newSector);
    const btnAdd = document.getElementById('btnAdd');
    btnAdd.before(newSector); // todo?
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
    sectorItem.remove();
}

function getClickedRemoveId(){
    // wat?
}

function findSectorRow(id) {
    // todo?
    const tableSectors = document.querySelector('.tableSectors'); // находим таблицу секторов     
    return tableSectors.querySelectorAll('tr')[id];
}