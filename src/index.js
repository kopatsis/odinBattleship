import { populator } from "./init";
import {AIPlayer, humanPlayer, gameboard, shipCreator, Ship} from "./gameplay";
import {overallDOM} from "./DOM"

populator();

let AI = AIPlayer();
let human = humanPlayer(AI);
let DOMob = overallDOM();

const left = document.querySelectorAll('.left');
const right = document.querySelectorAll('.right');


const gameRound = (e) => {
    const result = human.mainMover(parseInt(e.target.classList[1]));
    console.log(result);
}


const gamePlay = () => {
    right.forEach(sq => sq.onclick = gameRound);
    document.querySelector('.leftboard').style.cursor = "default";
    document.querySelector('.rightboard').style.cursor = "pointer";
    // let inProgress = true;
    // while(inProgress){
        // const result = human.mainMover();
        // console.log(result);
    // }
}

const gameStart = () => {
    if(DOMob.status()){
        AI.AIplace();
        const positions = DOMob.retPos();
        human.board.shipPlacer("Carrier", positions[0]);
        human.board.shipPlacer("Battleship", positions[1]);
        human.board.shipPlacer("Cruiser", positions[2]);
        human.board.shipPlacer("Submarine", positions[3]);
        human.board.shipPlacer("Destroyer", positions[4]);
        document.querySelector('.instruct').textContent = "Place your first hit on your opponent's board";
        gamePlay();
    }
}

const main = () => {

    DOMob.addListeners();

    document.querySelector('.start').onclick = gameStart;
}

main();

const reset = () => {
    window.location.reload();
}

document.querySelector('.reset').onclick = reset;