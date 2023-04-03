import { populator } from "./init";
import {AIPlayer, humanPlayer, gameboard, shipCreator, Ship} from "./gameplay";
import {overallDOM} from "./DOM"

populator();

let AI = AIPlayer();
let human = humanPlayer();
let DOMob = overallDOM();

const gameStart = () => {
    if(DOMob.status()){
        AI.AIplace();
        const positions = DOMob.retPos();
        human.board.shipPlacer("Carrier", positions[0]);
        human.board.shipPlacer("Battleship", positions[1]);
        human.board.shipPlacer("Cruiser", positions[2]);
        human.board.shipPlacer("Submarine", positions[3]);
        human.board.shipPlacer("Destroyer", positions[4]);
    }
}

const main = () => {

    DOMob.addListeners();

    document.querySelector('.start').onclick = gameStart;
}

main();