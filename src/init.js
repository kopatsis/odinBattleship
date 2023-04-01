const populator = () => {
    const left = document.querySelector('.leftboard');
    for(let i = 0; i < 10; i++){
        const row = document.createElement('div');
        row.className = "Left row";
        for(let j = 0; j < 10; j++){
            const sq = document.createElement('div');
            sq.className = `left ${i*10+j}`;
            row.appendChild(sq);
        }
        left.appendChild(row);
    }

    const right = document.querySelector('.rightboard');
    for(let i = 0; i < 10; i++){
        const row = document.createElement('div');
        row.className = "Right row";
        for(let j = 0; j < 10; j++){
            const sq = document.createElement('div');
            sq.className = `right ${i*10+j}`;
            row.appendChild(sq);
        }
        right.appendChild(row);
    }
}

export {populator}