const overallDOM = () => {

    const board = document.querySelectorAll('.left');

    let horiz = true;

    let currentShip = "Carrier";

    let currentLen = 5;

    const validChecker = (square, len) => {
        if(horiz){
            if((square%10 + len) > 10) return 10 - (square%10 + len);
            for(let i = 0; i < len; i++){
                if(board[square+i].classList.contains('ship')) return 0;
            }
            return 1;
        } else{
            if((Math.floor(square/10) + len) > 10) return 10 - (Math.floor(square/10) + len);
            for(let i = 0; i < len; i++){
                if(board[square+i*10].classList.contains('ship')) return 0;
            }
            return 1;
        }
    }

    const hoverFunc = (e) => {
        let highlight = currentLen;
        let start = parseInt(e.target.classList[1])
        let validity = validChecker(start, currentLen);
        let classToAdd;
        if(validity < 0){
            highlight -= validity;
            classToAdd = 'invalid';
        } else if (validity===0) classToAdd = 'invalid';
        else classToAdd = 'valid';
        
        if(horiz){
            for(let i = 0; i < highlight; i++){
                board[start+i].classList.add(classToAdd);
            }
        } else{
            for(let i = 0; i < highlight; i++){
                board[start+i*10].classList.add(classToAdd);
            }
        }
    }

    const unhoverFunc = (e) => {
        const start = parseInt(e.target.classList[1])
        if(horiz){
            for(let i = 0; i < currentLen; i++){
                if(start+i < 100){
                    board[start+i].classList.remove('valid');
                    board[start+i].classList.remove('invalid');
                }
            }
        } else{
            for(let i = 0; i < currentLen; i++){
                if(start+i*10 < 100){
                    board[start+i*10].classList.remove('valid');
                    board[start+i*10].classList.remove('invalid');
                }
            }
        }
    }

    const shipPlace = (e) => {
        if(validChecker(parseInt(e.target.classList[1]), currentLen) === 1){
            let start = parseInt(e.target.classList[1]);
            if(horiz){
                for(let i = 0; i < currentLen; i++){
                    board[start+i].classList.add('ship');
                }
            } else {
                for(let i = 0; i < currentLen; i++){
                    board[start+i*10].classList.add('ship');
                }
            }
        }
    }

    const getShip = () => {
        return currentShip;
    }

    const getHoriz = () => {
        return horiz;
    }

    const getLen = () => {
        return currentLen;
    }

    return {validChecker, getShip, getHoriz, getLen, hoverFunc, unhoverFunc, shipPlace}
    
}