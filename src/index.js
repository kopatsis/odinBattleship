import { populator } from "./init";
import {AIPlayer, humanPlayer, gameboard, shipCreator, Ship} from "./gameplay";
import {overallDOM} from "./DOM"

populator();

const gameStart = () => {
    if(DOMob.status()){
        const positions = DOMob.retPos();
        console.log(positions);
    }
}

let AI = AIPlayer();
let human = humanPlayer();

let DOMob = overallDOM();
DOMob.addListeners();

document.querySelector('.start').onclick = gameStart;