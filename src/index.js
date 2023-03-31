const Ship = (pr_name, pr_length) => {
    const name = pr_name;
    const length = pr_length;
    let squares = {};
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
    }

    const isSunk = () => {
        return sunk;
    }

    return {name, length, squares, sunk, hit, squareCreate, isSunk}
}