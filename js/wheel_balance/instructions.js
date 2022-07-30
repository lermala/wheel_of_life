import { Sector } from './Sector.js'
import { BalanceWheel } from './Wheel.js'
import { addBlock, addSectorToMenu, updateScore } from './menu.js'


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
const RADIUS = 50; // радиус минимальной (стартовой) окружности // todo
const WHEELS_COUNT = balanceWheel.maxScore; // кол-во кругов
const MAX_RADIUS = RADIUS * WHEELS_COUNT; // кол-во кругов
const SECTORS_COUNT = balanceWheel.numberOfSectors; // кол-во сфер/секторов
const SECTORS_DEGREES = 2 * PI / SECTORS_COUNT; // градусы сектора

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
        drawSector(RADIUS * value.score, i * SECTORS_DEGREES, value.color);
        // drawText(value.name, 10, 40); // todo 
        // addSector(value, balanceWheel.maxScore);
        console.log(value.name);
    });
}

function drawAllWheels() {
    // drawing all wheels
    for (let i = WHEELS_COUNT; i >= 1; i--) { // todo change 5 to numb of scores
        drawWheel(RADIUS * i);
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
    ctx.arc(CENTER_X, CENTER_Y, radius, start, start + SECTORS_DEGREES, false);
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
    ctx.translate(0, MAX_RADIUS);
    ctx.font = "18px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(txt, CENTER_X, CENTER_Y);
    

    ctx.restore();
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
    console.log(curSector); // todo
    console.log("curScore=" + curScore); // todo

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
        balanceWheel.sectors[curSector - 1].score = curScore;
        updateScore(curSector - 1, curScore); // drawing new score
    }
}

function checkCurrentCoordinates(evt) {
    // https://ru.stackoverflow.com/questions/238719/%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA-mousemove-%D0%B2-canvas
    var start = 0;
    var rad = 2 / SECTORS_COUNT * PI; // todo

    // Получаем координаты точки холста, в которой щелкнули
    var mouseX = evt.pageX - canvas.offsetLeft;
    var mouseY = evt.pageY - canvas.offsetTop;

    var xFromCentre = mouseX - CENTER_X;
    var yFromCentre = mouseY - CENTER_Y;

    // теорема пифагора
    var distanceFromCentre = Math.sqrt(Math.pow(Math.abs(xFromCentre), 2) + Math.pow(Math.abs(yFromCentre), 2));

    // если выходим за пределы колеса, то возвращаем его в состояние из массива
    // это нужно чтобы очистить превью при mousemove
    if (distanceFromCentre > MAX_RADIUS) {
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

    for (var i = 1; i < SECTORS_COUNT + 1; i++) {
        if (clickAngle >= start + rad * (i - 1) && clickAngle <= start + rad * i) {
            return i;
        }
    }

    return -1;
}

function findHoveredScore(distanceFromCentre) {
    // поставим проверку, чтобы была возможность поставить 0.
    if (distanceFromCentre <= RADIUS / 2) {
        return 0;
    }

    const roundedDistance = Math.ceil(distanceFromCentre / RADIUS) * RADIUS;
    return roundedDistance / RADIUS;
}

// возврат к состоянию из массива (очистка превью)
function clearHovered() {
    curSector = -1;
    curScore = -1;

    clearCanvas();
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// при наведении мыши предпросмотр нового сектора
// после отпуска мыши возврат к исх. состоянию
function previewSectors() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // todo clear
    console.log("preview curScore=" + curScore + " curSector=" + curSector); // todo
    balanceWheel.sectors.forEach(function (value, i) {
        if (i + 1 == curSector) {
            drawSector(RADIUS * curScore, i * SECTORS_DEGREES, colors[i]);  // todo      
        } else {
            drawSector(RADIUS * value.score, i * SECTORS_DEGREES, colors[i]);  // todo      
        }
    });

    drawAllWheels(); // todo
}


// ==================== work with menu ====================
export function drawMenu() {
    // addBlock();
    balanceWheel.sectors.forEach(el => addSectorToMenu(el, balanceWheel.maxScore));

    // addSectorToMenu(balanceWheel.sectors[0], balanceWheel.maxScore);   
    
}

function updateSectorMenu(id){

}

export function addSector() {
    console.log("click btn add");
    balanceWheel.addSector(new Sector({}));    
    addSectorToMenu(balanceWheel.sectors[balanceWheel.sectors.length - 1]);           
    clearCanvas();
    drawAll();
}


