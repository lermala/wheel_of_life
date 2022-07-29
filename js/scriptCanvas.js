import { init } from "./wheel_balance/instructions.js";

console.log("start");

const wheel = document.querySelector(".wheelBalance");

init();

const btnAdd = document.getElementById("btnAdd");
//btnAdd.onclick = init();


// drawing
// Получение элемента canvas, контекста и свойства Math.PI
let canvas = document.getElementById('wheelBalance');
let ctx = canvas.getContext('2d');
let PI = Math.PI;

// coordinates and sizes
const CANVAS_W = parseInt(canvas.getAttribute("width"));
const CENTER_X = CANVAS_W / 2;
const CENTER_Y = CANVAS_W / 2;
const RADIUS = 40; // радиус минимальной (стартовой) окружности
const WHEELS_COUNT = 5; // кол-во кругов
const SECTORS_COUNT = 8; // кол-во сфер/секторов
const SECTORS_DEGREES = 2 * PI / SECTORS_COUNT; // градусы сектора

// visual style
const LINE_WIDTH = 1; // толщина обводки
const STROKE_STYLE = "#8d9496"; // цвет обводки
const FILL_STYLE = "#ed61ca";

const colors = [
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

drawAll(); // todo


function drawAll() {
    // drawing wheel
    ctx.beginPath(); // начало нового пути
    ctx.lineWidth = LINE_WIDTH; // толщина обводки
    ctx.strokeStyle = STROKE_STYLE; // цвет обводки
    ctx.fillStyle = FILL_STYLE;

    // drawing all lines/sectors
    for (var i = 0; i < SECTORS_COUNT; i++) { // todo
        drawSector(RADIUS * WHEELS_COUNT, i * SECTORS_DEGREES, colors[i]);
    }

    // drawing all wheels
    for (var i = WHEELS_COUNT; i >= 1; i--) { // todo change 5 to numb of scores
        drawWheel(RADIUS * i);
        console.log(RADIUS * i);
    }
}

function addEvents() {
    canvas.onmousemove = function(event) {
        var x = event.offsetX;
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