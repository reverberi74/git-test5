/*
  La tombola magica
  Scrivi un programma che dato:
  - un array di 10 elementi di numeri casuali interi (compresi tra 1 e 90 senza ripetizioni),
  - un array di 10 numeri interi a tuo piacimento (compresi tra 1 e 90 senza ripetizioni)
  Verifichi quanti numeri scelti da te sono presenti nell'array principale e restituisca un risultato del tipo:
    2 numeri uguali => ambo
    3 numeri uguali => terna
    4 numeri uguali => quaterna
    5 numeri uguali => cinquina
    tutti i numeri uguali => tombola

  In caso di vittoria dovrà essere stampato un messaggio "Hai fatto X",
  in caso di perdita dovrà essere mostrato il messaggio "Mi dispiace, hai perso!".*/
  function generateRandomNumbers(count, min, max) {
    let numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
}

function checkMatches(mainArray, chosenArray) {
    let matches = chosenArray.filter(num => mainArray.includes(num)).length;
    
    switch (matches) {
        case 2:
            console.log("Hai fatto Ambo!");
            break;
        case 3:
            console.log("Hai fatto Terna!");
            break;
        case 4:
            console.log("Hai fatto Quaterna!");
            break;
        case 5:
            console.log("Hai fatto Cinquina!");
            break;
        case 10:
            console.log("Hai fatto Tombola!");
            break;
        default:
            console.log("Mi dispiace, hai perso!");
    }
}

// Creazione dell'array casuale
const mainNumbers = generateRandomNumbers(10, 1, 90);
console.log("Numeri della tombola:", mainNumbers);

// Definizione dell'array scelto dall'utente
const chosenNumbers = [5, 12, 23, 35, 46, 57, 68, 74, 81, 90]; // Personalizzabile
console.log("Numeri scelti:", chosenNumbers);

// Verifica delle corrispondenze
checkMatches(mainNumbers, chosenNumbers);
