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
        if(sinkCheck()){
            return "sunk";
        } else{
            return "not sunk";
        }
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
    out = [];
    out.push(Ship("Carrier", 5));
    out.push(Ship("Battleship", 4));
    out.push(Ship("Cruiser", 3));
    out.push(Ship("Submarine", 3));
    out.push(Ship("Destroyer", 2));
    return out;
}

// let rod = shipCreator();
// for(const ship of rod){
//     console.log(ship);
// }