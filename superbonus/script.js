
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


//funzione che ritorna il range massimo associato all difficolta del gioco
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


play.addEventListener('click', function () {
    //selezione difficolta'
    const select = document.querySelector('#difficolta').value;
    const difficulty = difficultySelect(select);
    console.log(difficulty, select)
    //pulizia campo da gioco
    document.querySelector('.field').innerHTML = '';
    //genrazione campo da gioco
    fieldGenerator(difficulty, '.field');
    const bombs = generateBombs(16, difficulty);
    //hook per modale
    const overlayModale = document.getElementsByClassName('overlay-modal')[0];
    const modale = document.getElementsByClassName('modal')[0];
    const risultato = document.getElementById('risultato');

    console.log(bombs);
    const userPickedNumbers = [];
    let isAlive = true;
    //bollean per verificare se e' morto
    //aggiungere ai 100 div un event listener con collegata una funzione dche fa il check bomba/non bomba
    for (let i = 1; i <= difficulty; i++) {
        const button = document.getElementById(`${i}`);
        button.addEventListener('click', function () {
            if (!isAlive) return;
            //se l'id del box combacia con un valore delle bombe allora colora di rosso la casella 
            if (bombs.includes(Number(button.id))) {
                button.className = "box bomb";
                isAlive = false;
                //mostra bombe alla sconfittarefactoring js
                for (let i = 0; i < bombs.length; i++) {
                    document.getElementById(`${bombs[i]}`).className = 'box bomb';
                    document.getElementById(`${bombs[i]}`).style.backgroundImage = `url('bomb.png')`
                }
                risultato.append(`Hai colpito una bomba e il tuo punteggio e' ${userPickedNumbers.length}`);//per la modale
                modale.classList.add('active');
                overlayModale.classList.add('active')
            }
            else {
                //se l'elemento non appare tra quelli gia selezionati , pushalo in quella lista e coloradi verde la casella
                if (!userPickedNumbers.includes(Number(button.id))) {
                    userPickedNumbers.push(Number(button.id));
                    button.className = "box clear";
                    console.log(userPickedNumbers);
                }
                if (difficulty - bombs.length == userPickedNumbers.length) {
                    isAlive = false;
                    risultato.append(`HAI VINTO!!! iL tuo punteggio e' ${userPickedNumbers.length}`);//per la modale
                    modale.classList.add('active');
                    overlayModale.classList.add('active')
                }
            }
        });
    }
});
