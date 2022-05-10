
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
    if (diff === 0) {
        return maxRange = 100;
    } else if (diff === 1) {
        return maxRange = 80;
    } else {
        return maxRange = 50;
    }
}
// --- MAIN ---

let difficulty;
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50
do {
    difficulty = Number(prompt(`Scegliere la difficolta': 0 => tra 1 e 100 , 1 => tra 1 e 80 , 2 => tra 1 e 50`))
} while (isNaN(difficulty) || difficulty < 0 || difficulty > 2);

let maxDifficultyRange = difficultySelect(difficulty);
fieldGenerator(maxDifficultyRange, '.field');
// Il computer deve generare 16 numeri casuali tra 1 e il range specificato dalla difficolta'.
// I numeri non possono essere duplicati.
const bombs = generateBombs(16, maxDifficultyRange);
console.log(bombs);
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta

let userNumber; //scelta corrente del giocatore
const userPickedNumbers = [];// numeri scelti dal giocatore, la lunghezza della lista sara' il punteggio  finale del player 
do {
    do {
        userNumber = Number(prompt('Inserisci un numero tra quelli rimanenti:'))
    } while (isNaN(userNumber) || userNumber < 1 || userNumber > maxDifficultyRange); //sempre compreso tra 1 e e il range di difficolta selezionato.

    //se in numero non e' mai stato scelto aggiungilo alla lista( L’utente non può inserire più volte lo stesso numero.)
    if (!userPickedNumbers.includes(userNumber)) {
        userPickedNumbers.push(userNumber);
        console.log(userPickedNumbers);
    }
    document.getElementById(`${userNumber}`).className = 'box clear' // colora di verde il box pulito
    // Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
    if ((maxDifficultyRange - bombs.length) == userPickedNumbers.length) {
        console.log(`Hai vinto e il tuo punteggio e' ${userPickedNumbers.length}`);
    }
    // Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.    
} while (!bombs.includes(userNumber) && userPickedNumbers.includes(userNumber)); // chiedi numero finche non e' gia stato scelto o se ha preso una bomba

// La partita termina quando il giocatore inserisce un numero “vietato” / colora di rosso la bomba
console.log(`Hai colpito una bomba e il tuo punteggio e' ${userPickedNumbers.length - 1}`); //tolgo dal punteggio l'ultima immissione
document.getElementById(`${userNumber}`).className = 'box bomb'


