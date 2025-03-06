/**/ 
let numbers = [11, 22, 33, 44, 55, 66];  // array di partenza
let numbersReverse = []; // Nuovo array per i numeri invertiti
for(let i = numbers.length - 1; i >= 0; i--){
    numbersReverse.push(numbers[i]);
}
numbersReverse.forEach(numbersReverse => console.log(numbersReverse));