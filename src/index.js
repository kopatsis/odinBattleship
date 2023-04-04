import { populator } from "./init";
import {AIPlayer, humanPlayer, gameboard, shipCreator, Ship} from "./gameplay";
import {overallDOM} from "./DOM"

populator();

let AI = AIPlayer();
let human = humanPlayer();
let DOMob = overallDOM();


// const gamePlay = () => {
//     let inProgress = true;
//     while(inProgress){
//         const result = human.mainMover();
//     }
// }

const gameStart = () => {
    if(DOMob.status()){
        AI.AIplace();
        const positions = DOMob.retPos();
        human.board.shipPlacer("Carrier", positions[0]);
        human.board.shipPlacer("Battleship", positions[1]);
        human.board.shipPlacer("Cruiser", positions[2]);
        human.board.shipPlacer("Submarine", positions[3]);
        human.board.shipPlacer("Destroyer", positions[4]);
        // gamePlay();
    }
}

const main = () => {

    DOMob.addListeners();

    document.querySelector('.start').onclick = gameStart;
}

main();