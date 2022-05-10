
// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// --- FUNZIONI ---
//funzione che genera il campo di battaglia con un numero di tile pari a quello della difficolta
function fieldGenerator(tileNumber, hook) {
    const father = document.querySelector(hook);
    for (let i = 1; i <= tileNumber; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.id = i;
        box.append(i);
        father.append(box);
    }
}

// genera numero random compreso da min a max
function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// funzione che genera N bombe: ritorna un array di n numeri univoci nel range specificato
function generateBombs(bombNumber, range) {
    const array = [];
    while (array.length < bombNumber) {
        const number = randomNumberRange(1, range);
        if (!array.includes(number)) {
            array.push(number);
        }
    }
    return array;
}


//funzione che ritorna il range massimo associato alal difficolta del gioco
function difficultySelect(diff) {
    let maxRange;
    if (diff === 'easy') {
        return maxRange = 100;
    } else if (diff === 'normal') {
        return maxRange = 80;
    } else if (diff === 'hard') {
        return maxRange = 50;
    }
}





// --- MAIN ---

//hook al play e selezione difficolta
const play = document.querySelector('#play');
console.log(play);
play.addEventListener('click', function () {
    const select = document.querySelector('#difficolta').value;
    const difficulty = difficultySelect(select);
    console.log(difficulty, select)

    fieldGenerator(difficulty, '.field');
    const bombs = generateBombs(16, difficulty);

    console.log(bombs);
    const userPickedNumbers = [];
});