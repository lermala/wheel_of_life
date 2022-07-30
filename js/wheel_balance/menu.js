const menu = document.querySelector('.menuWheel');
const BLOCK_CLASS_NAME = '.menuWheel__block';
const SECTOR_CLASS_NAME = '.sectorInfo';

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

export function updateSector(id, updatedSector) {    
    const blockSectors = menu.querySelector(BLOCK_CLASS_NAME); // берем первый блок // todo
    
    // searching сектор
    const sectorItem = document.querySelectorAll(SECTOR_CLASS_NAME)[id];
    
    // updating sector
    sectorItem.textContent = updateSector.name;

    
}

export function updateScore(id, newScore) {    
    // searching сектор
    const sectorItem = document.querySelectorAll(SECTOR_CLASS_NAME)[id];
    const sectorScore = sectorItem.querySelector(".sectorInfo__score");
    sectorScore.textContent = newScore;
}

export function deleteSector(id){ 

}