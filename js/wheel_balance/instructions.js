import { Sector } from './Sector.js'
import { BalanceWheel } from './Wheel.js'
// import { addSectorToMenu, updateScoreInMenu, redrawSectors, deleteSectorFromMenu, addEventForSectorName, addEventForSectorBtn } from './menu.js'
import { MenuWheel } from './MenuWheel.js'
import { updateScoreInMenu } from './menu.js';

// Получение элемента canvas, контекста и свойства Math.PI
var canvas = document.getElementById('wheelBalance');
var ctx = canvas.getContext('2d');

// coordinates and sizes
const PI = Math.PI;
const CANVAS_W = parseInt(canvas.getAttribute("width")); // todo
const CENTER_X = CANVAS_W / 2;
const CENTER_Y = CANVAS_W / 2;

// wheel info
var balanceWheel = new BalanceWheel({}); // дефолтное колесо

// visual style
const LINE_WIDTH = 1; // толщина обводки
const STROKE_STYLE = "#8d9496"; // цвет обводки
const FILL_STYLE = "#ed61ca";


// DRAWING
export function drawAll() {
    ctx.beginPath();
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = STROKE_STYLE;
    ctx.fillStyle = FILL_STYLE;

    drawAllSectors();
    drawAllWheels();
}

function drawAllSectors() {
    // addBlock();     
    balanceWheel.sectors.forEach(function (value, i) {
        drawSector(
            balanceWheel.radius * value.score,
            i * balanceWheel.sectorDegrees,
            value.color
        );
        // drawText(value.name, 10, 40); // todo 
        // addSector(value, balanceWheel.maxScore);

    });
}

function drawAllWheels() {
    // drawing all wheels
    for (let i = balanceWheel.maxScore; i >= 1; i--) { // todo change 5 to numb of scores
        drawWheel(balanceWheel.radius * i);
    }
}

function drawWheel(radius) {
    // Координаты центра круга, радиус, начальный угол, конечный угол, направление по часовой стрелке
    ctx.beginPath(); // начало нового пути
    ctx.arc(CENTER_X, CENTER_Y, radius, 0, PI * 2, false);
    // ctx.fill();
    ctx.stroke();
}

function drawSector(radius, start, color) {
    ctx.beginPath(); // начало нового пути
    ctx.moveTo(CENTER_X, CENTER_Y);
    ctx.arc(CENTER_X, CENTER_Y, radius, start, start + balanceWheel.sectorDegrees, false);
    ctx.lineTo(CENTER_X, CENTER_Y);

    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function drawText(txt, x, y) {
    ctx.save();
    // ctx.rotate(SECTORS_DEGREES / 2);
    // ctx.translate(SECTORS_DEGREES, SECTORS_DEGREES);

    ctx.translate(0, 0);
    ctx.translate(0, balanceWheel.maxRadius);
    ctx.font = "18px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(txt, CENTER_X, CENTER_Y);


    ctx.restore();
}

function updateCanvas() {
    balanceWheel.recount(); // update    
    clearCanvas(); // clearing
    drawAll(); // redraw all
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ==================== actions with sectors ====================
export function addEvent() {
    console.log("addEvent");
    canvas.onmousemove = canvasMove;
    canvas.onclick = canvasClick; // todo // сохранение текущ. положения или перерисовка из массива
}

var curSector = -1;
var curScore = -1;
function canvasMove(evt) {
    curSector = checkCurrentCoordinates(evt);
    // console.log(curSector); // todo
    // console.log("curScore=" + curScore); // todo

    // draw new sector but after leave clean it
    if (curSector == -1) {
        // мы вне какого-либо сектора
    } else {
        // какой-то сектор под курсором и что-то можем сделать
        // writing new score in sector array
        previewSectors();
    }
}

function canvasClick(evt) {
    if (curSector == -1) {
        // мы вне какого-либо сектора
    } else {
        // какой-то сектор под курсором и что-то можем сделать
        // writing new score in sector array
        // balanceWheel.sectors[curSector - 1].score = curScore;    
        // menuWheel.updateScore(curSector - 1, curScore);
        updateScore(curSector - 1, curScore);
    }
}

function checkCurrentCoordinates(evt) {
    // https://ru.stackoverflow.com/questions/238719/%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-mousemove-%D0%B2-canvas
    var start = 0;
    var rad = 2 / balanceWheel.numberOfSectors * Math.PI; // todo

    // Получаем координаты точки холста, в которой щелкнули
    var mouseX = evt.pageX - canvas.offsetLeft;
    var mouseY = evt.pageY - canvas.offsetTop;

    var xFromCentre = mouseX - CENTER_X;
    var yFromCentre = mouseY - CENTER_Y;

    // теорема пифагора
    var distanceFromCentre = Math.sqrt(Math.pow(Math.abs(xFromCentre), 2) + Math.pow(Math.abs(yFromCentre), 2));

    // если выходим за пределы колеса, то возвращаем его в состояние из массива
    // это нужно чтобы очистить превью при mousemove
    if (distanceFromCentre > balanceWheel.maxRadius) {
        if (curSector != -1) {
            clearHovered();
            drawAll();
        }
        return -1; // todo    
    }

    // смотрим в пределах какой окруждности находимся
    curScore = findHoveredScore(distanceFromCentre);

    // угол относительно центра (начинаем с 12 часов)
    var clickAngle = Math.atan2(yFromCentre, xFromCentre) - start;
    if (clickAngle < 0) clickAngle = 2 * Math.PI + clickAngle;
    clickAngle = clickAngle + start; // небольшой хак

    for (var i = 1; i < balanceWheel.numberOfSectors + 1; i++) {
        if (clickAngle >= start + rad * (i - 1) && clickAngle <= start + rad * i) {
            return i;
        }
    }

    return -1;
}

function findHoveredScore(distanceFromCentre) {
    // поставим проверку, чтобы была возможность поставить 0.
    if (distanceFromCentre <= balanceWheel.radius / 2) {
        return 0;
    }

    const roundedDistance = Math.ceil(distanceFromCentre / balanceWheel.radius) * balanceWheel.radius;
    return roundedDistance / balanceWheel.radius;
}

// при наведении мыши предпросмотр нового сектора
// после отпуска мыши возврат к исх. состоянию
function previewSectors() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // todo clear    
    balanceWheel.sectors.forEach(function (value, i) {
        if (i + 1 == curSector) {
            drawSector(
                balanceWheel.radius * curScore,
                i * balanceWheel.sectorDegrees,
                value.color
            );  // todo      
        } else {
            drawSector(
                balanceWheel.radius * value.score,
                i * balanceWheel.sectorDegrees,
                value.color
            );  // todo      
        }
    });

    drawAllWheels(); // todo
}

// возврат к состоянию из массива (очистка превью)
function clearHovered() {
    curSector = -1;
    curScore = -1;

    clearCanvas();
}

// ==================== work with menu ====================
const menuWheel = new MenuWheel({
    sectors: balanceWheel.sectors,
    maxScore: balanceWheel.maxScore,
    toChange: (id, newName) => changeSector(id, newName),
    toDelete: (id) => deleteSector(id),
});

export function drawMenu() {
    menuWheel.updateDOM();
    menuWheel.updateData(balanceWheel.sectors);
    menuWheel.drawSectors(
        // (id, newName) => changeSector(id, newName),
        // (id) => deleteSector(id)
    );
}


export function addSector() {
    balanceWheel.addSector(new Sector({})); // todo     
    menuWheel.drawSectors();
    menuWheel.focusLastInput();
    updateCanvas();
}

function deleteSector(id) {
    balanceWheel.deleteSector(id);
    menuWheel.drawSectors();
    updateCanvas();
}

function changeSector(id, newName) {
    balanceWheel.changeSectorName(id, newName);
    menuWheel.drawSectors();
    updateCanvas();
}

function updateScore(id, score) {
    balanceWheel.sectors[id].score = score;    
    menuWheel.updateScore(id, score);
}




