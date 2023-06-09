const overallDOM = () => {

    const board = document.querySelectorAll('.left');

    let horiz = true;

    let currentShip = "Carrier";

    let currentLen = 5;

    let orderedPositions = [];

    let readyState = false;

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
            highlight += validity;
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
            const start = parseInt(e.target.classList[1]);
            let currentPoses = [];
            if(horiz){
                for(let i = 0; i < currentLen; i++){
                    board[start+i].classList.remove('valid');
                    board[start+i].classList.remove('invalid');
                    board[start+i].classList.add('ship');
                    currentPoses.push(start+i);
                }
            } else {
                for(let i = 0; i < currentLen; i++){
                    board[start+i*10].classList.remove('valid');
                    board[start+i*10].classList.remove('invalid');
                    board[start+i*10].classList.add('ship');
                    currentPoses.push(start+i*10);
                }
            }
            orderedPositions.push(currentPoses);
            changeShip();
        }
    }

    const changeShip = () => {
        if(currentShip==="Carrier"){
            currentShip = "Battleship";
            currentLen = 4;
            document.querySelector('.instruct').textContent = "Place your Battleship on a valid position on your board";
        } else if (currentShip==="Battleship"){
            currentShip = "Cruiser";
            currentLen = 3;
            document.querySelector('.instruct').textContent = "Place your Cruiser on a valid position on your board";
        } else if (currentShip==="Cruiser"){
            currentShip = "Submarine";
            document.querySelector('.instruct').textContent = "Place your Submarine on a valid position on your board";
        } else if (currentShip==="Submarine"){
            currentShip = "Destroyer";
            currentLen = 2;
            document.querySelector('.instruct').textContent = "Place your Destroyer on a valid position on your board";
        } else{
            for(const sq of board){
                sq.onclick = '';
                sq.onmouseover = '';
                sq.onmouseout = '';
            }
            document.querySelector('.switch').onclick = '';
            document.querySelector('.switch').style.visibility = "hidden";
            readyState = true;
            document.querySelector('.instruct').textContent = "Click Start to start your game";
        }
    }

    const addListeners = () => {
        for(const sq of board){
            sq.onclick = shipPlace;
            sq.onmouseover = hoverFunc;
            sq.onmouseout = unhoverFunc;
        }
        document.querySelector('.switch').onclick = switches;
    }

    const switches = (e) => {
        switchHoriz();
        if(horiz){
            document.querySelector('.switch').textContent = "Change to Vertical";
        } else {
            document.querySelector('.switch').textContent = "Change to Horizontal";
        }
    }

    const getShip = () => {
        return currentShip;
    }

    const setShip = (pr) => {
        currentShip = pr;
    }

    const getHoriz = () => {
        return horiz;
    }

    const switchHoriz = () => {
        horiz = !horiz;
    }

    const getLen = () => {
        return currentLen;
    }

    const setLen = (len) => {
        currentLen = len;
    }

    const status = () => {
        return readyState;
    }

    const retPos = () => {
        return orderedPositions;
    }

    return {validChecker, getShip, getHoriz, getLen, hoverFunc, unhoverFunc, shipPlace, setShip, switchHoriz, setLen, addListeners, status, retPos}
    
}

export {overallDOM}
