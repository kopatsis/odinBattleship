const Ship = (pr_name, pr_length) => {
    const name = pr_name;
    const length = pr_length;
    let squares = {};
    let assigned = false;
    let sunk = false;

    const hit = (sq) => {
        squares[sq] = "hit";
        if(sinkCheck()) return "sunk";
        else return "not sunk";
    }

    const sinkCheck = () => {
        for (const key in squares){
            if (squares[key]==="unhit") return false;
        }
        sunk = true;
        return true;
    }

    const squareCreate = (posArray) => {
        for(const position of posArray){
            squares[position] = "unhit";
        }
        assigned = true;
    }

    const isSunk = () => {
        return sunk;
    }

    const isAssigned = () => {
        return assigned;
    }

    // const retSq = () => {
    //     return squares;
    // }

    return {name, length, squares, hit, squareCreate, isSunk, isAssigned}
}


const shipCreator = () => {
    let out = {};
    out["Carrier"] = Ship("Carrier", 5);
    out["Battleship"] = Ship("Battleship", 4);
    out["Cruiser"] = Ship("Cruiser", 3);
    out["Submarine"] = Ship("Submarine", 3);
    out["Destroyer"] = Ship("Destroyer", 2);
    return out;
}

const gameboard = () => {

    let allShips = shipCreator();

    let placeBoard = new Array(100).fill(null);

    let hitBoard = new Array(100).fill("unhit");

    const availCreate = () => {
        let ret = new Set();
        for (let i = 0; i < 100; i++){
            ret.add(i);
        }
        return ret;
    }

    let availMoves = availCreate();

    const receiveAttack = (pos) => {
        let out = [pos];
        hitBoard[pos] = "hit";
        if(placeBoard[pos] !== null){
            out.push("hit");
            const stat = allShips[placeBoard[pos]].hit(pos);
            if(stat === "sunk"){
                out.push(placeBoard[pos]);
                let loss = true;
                for(const ship in allShips){
                    if(!allShips[ship].isSunk()) loss = false;
                }
                if(loss){
                    out.push("Gameover");
                } else{
                    out.push("In Play");
                }
            } else{
                out.push(null);
                out.push("In Play");
            }
        } else{
            out.push("miss");
            out.push(null);
            out.push("In Play");
        }
        return out;
    }

    const shipPlacer = (ship, pos_arr) => {
        for (const pos of pos_arr){
            placeBoard[pos] = ship;
        }
        allShips[ship].squareCreate(pos_arr);
    }

    return {allShips, placeBoard, hitBoard, availMoves, receiveAttack, shipPlacer}
}


const humanPlayer = (pr_AI) => {
    const otherPlayer = pr_AI;

    let board = gameboard();

    let isTurn = true;

    const mainMover = (square) => {
        if(isTurn){
            isTurn = false;

            let attack_result = otherPlayer.board.receiveAttack(square);

            if(attack_result[2]==="Gameover"){
                return [attack_result, [null, null, null, null]];
            }else {
                let received_result = board.receiveAttack(otherPlayer.AIAtttack());
                isTurn = true;
                return [attack_result, received_result];
            }
        } 
    }

    const retOther = () => {
        return otherPlayer;
    }

    return {board, mainMover, retOther}
}

const AIPlayer = () => {
    let board = gameboard();

    const AIAtttack = () => {
        let iterNum = Math.floor(Math.random()*board.availMoves.size);
        let count = 0;
        for(const item of board.availMoves){
            if(iterNum === count){
                board.availMoves.delete(item);
                return item;
            }
            count++;
        }
    }

    const AIplace = () => {
        for(const shipname in board.allShips){
            const s_len = board.allShips[shipname].length;
            let unplaced = true;
            while(unplaced){
                const randpos = Math.floor(Math.random()*100);
                const orient = Math.floor(Math.random()*2);
                let valid_place = true;
                if(orient===0){
                    if((randpos%10)+s_len > 10) valid_place = false;
                } else {
                    if(Math.floor((randpos+s_len*10)/10) > 10) valid_place = false;
                }
                for(let i = 0; i < s_len; i++){
                    if(orient===0){
                        // if((randpos+i)%10 >= 10) valid_place = false;
                        if(board.placeBoard[randpos+i] !== null) valid_place = false;
                    } else {
                        // if((randpos+i*10)/10 >= 10) valid_place = false;
                        if(board.placeBoard[randpos+i*10] !== null) valid_place = false;
                    }
                }
                if(valid_place){
                    let place_arr = [];
                    for(let i = 0; i < s_len; i++){
                        if(orient===0){
                            place_arr.push(randpos+i);
                        } else {
                            place_arr.push(randpos+i*10);
                        }
                    }
                    board.shipPlacer(shipname, place_arr);
                    unplaced = false;
                }
            }
        }
    }

    return {board, AIAtttack, AIplace}
}

export {AIPlayer, humanPlayer, gameboard, shipCreator, Ship}