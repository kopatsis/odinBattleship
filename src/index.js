import { populator } from "./init";
import {AIPlayer, humanPlayer, gameboard, shipCreator, Ship} from "./gameplay";
import {overallDOM} from "./DOM"

populator();

let AI = AIPlayer();
let human = humanPlayer(AI);
let DOMob = overallDOM();

const left = document.querySelectorAll('.left');
const right = document.querySelectorAll('.right');

const reset = () => {
    window.location.reload();
}

const gameOverFunc = () => {
    right.forEach(sq => sq.onclick = '');
    document.querySelector('.rightboard').style.cursor = "default";
    document.querySelector('.start').onclick = reset;
}


const gameRound = (e) => {
    document.querySelector('.instruct').textContent = "Place your next hit on your opponent's board";
    if(!e.target.classList.contains('miss') && !e.target.classList.contains('hit')) {
        const result = human.mainMover(parseInt(e.target.classList[1]));
        let res1 = "";
        let res2 = "";
        if(result[0][1]==="hit"){
            right[result[0][0]].classList.add('ship');
            right[result[0][0]].classList.add('hit');
            res1 += "Your strike was a hit";
            if(result[0][2] !== null){
                res1 += `, you sunk your opponent's ${result[0][2]}. `;
                if(result[0][3]==="Gameover"){
                    res1 += "You won the game!";
                }
            }
        } else {
            right[result[0][0]].classList.add('miss');
            res1 += "Your strike was a miss";
        }
        document.querySelector('.result1').textContent = res1;
        if(result[0][3]==="Gameover"){
            document.querySelector('.result2').textContent = '';
            document.querySelector('.instruct').textContent = '';
            gameOverFunc();
        } else {
            if(result[1][1]==="hit"){
                left[result[1][0]].classList.add('hit');
                res2 += "Your opponent's strike was a hit";
                if(result[1][2] !== null){
                    res2 += `, your opponent sunk your ${result[1][2]}. `;
                    if(result[1][3]==="Gameover"){
                        res2 += "You lost the game :(";
                    }
                }
            } else {
                left[result[1][0]].classList.add('miss');
                res2 += "Your opponent's strike was a miss";
            }
            document.querySelector('.result2').textContent = res2;
            if(result[1][3]==="Gameover"){
                document.querySelector('.instruct').textContent = '';
                gameOverFunc();
            }
        }
    }
}

const gameStart = () => {
    if(DOMob.status()){
        AI.AIplace();
        console.log(AI.board.placeBoard);
        const positions = DOMob.retPos();
        human.board.shipPlacer("Carrier", positions[0]);
        human.board.shipPlacer("Battleship", positions[1]);
        human.board.shipPlacer("Cruiser", positions[2]);
        human.board.shipPlacer("Submarine", positions[3]);
        human.board.shipPlacer("Destroyer", positions[4]);
        document.querySelector('.instruct').textContent = "Place your first hit on your opponent's board";
        right.forEach(sq => sq.onclick = gameRound);
        document.querySelector('.leftboard').style.cursor = "default";
        document.querySelector('.rightboard').style.cursor = "pointer";
    }
}

const main = () => {

    DOMob.addListeners();

    document.querySelector('.start').onclick = gameStart;
}

main();

document.querySelector('.reset').onclick = reset;