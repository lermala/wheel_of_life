import { Sector } from './Sector.js'
import { BalanceWheel } from './Wheel.js'

let balanceWheel = new BalanceWheel({}); // дефолтное колесо

export function init() {        
    // balanceWheel = new BalanceWheel({}); // дефолтное колесо
    console.log(balanceWheel);
}

export function drawBalanceWheel() {
    balanceWheel.sectors.forEach( (i) => {
        const rotation = balanceWheel.getSectorDegrees * i; // todo
        
    });
}

export function drawCircle (radius) {
    console.log(drawCircle);
}

export function drawSector() {

}




// export const init = instructions.init;
// export const drawBalanceWheel = instructions.drawBalanceWheel;
// export const drawSector = instructions.drawSector;