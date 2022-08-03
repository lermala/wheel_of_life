import { drawAll, addEvent, drawMenu, addSector } from "./wheel_balance/instructions.js";

// start
window.onload = function () {
    const wheel = document.querySelector(".wheelBalance");    
    
    //btnAdd.onclick = init();
    
    drawAll();
    addEvent();
    drawMenu();

    const btnAdd = document.getElementById("btnAdd");
    btnAdd.onclick = addSector;   
}