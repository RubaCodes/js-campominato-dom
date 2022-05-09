

// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// --- FUNZIONI ---

// genera numero random compreso da min a max
function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// funzione che genera N bombe: ritorna un array di n numeri univoci
function generateBombs(bombNumber) {
    const array = [];
    while (array.length < bombNumber) {
        const number = randomNumberRange(1, 100);
        if (!array.includes(number)) {
            array.push(number);
        }
    }
    return array;
}


// --- MAIN ---
// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati.
const bombs = generateBombs(2);
console.log(bombs);
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta

let userNumber;
const userPickedNumbers =[];
//do {
    do {
        userNumber = Number(prompt('Inserisci un numero tra quelli rimanenti:'))
    } while ( isNaN(userNumber) || userNumber < 1 || userNumber > 100 ); //sempre compreso tra 1 e 100.
    userPickedNumbers.push(userNumber);
    console.log(userPickedNumbers);
//}while(!bombs.includes(userNumber) || !userPickedNumbers.includes(userNumber));