const Ship = (pr_name, pr_length) => {
    const name = pr_name;
    const length = pr_length;
    let squares = {};
    let assigned = false;
    let sunk = false;

    const hit = (sq) => {
        if (sq in squares){
            squares[sq] = "hit";
        }
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

    return {name, length, squares, hit, squareCreate, isSunk, isAssigned}
}


const shipCreator = () => {
    out = {};
    out["Carrier"] = Ship("Carrier", 5);
    out["Battleship"] = Ship("Battleship", 5);
    out["Cruiser"] = Ship("Cruiser", 5);
    out["Submarine"] = Ship("Submarine", 5);
    out["Destroyer"] = Ship("Destroyer", 5);
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
        out = [];
        hitBoard[pos] = "hit";
        if(placeBoard[pos] !== null){
            out.push("hit");
            const stat = allShips[placeBoard[pos]].hit();
            if(stat === "sunk"){
                out.push(allShips[placeBoard[pos]]);
                let loss = true;
                for(const ship of allShips){
                    if(!ship.isSunk()) loss = false;
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