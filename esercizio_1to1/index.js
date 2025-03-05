/*scrivi una funzione che accetta un array di stringe come parametro e restituisce la stringa più lunga
*/ 

function stringLong (arrayStringhe){
    if(!Array.isArray(numbers) || numbers.length === 0){
        console.log("Inserisci un array valido");
        return;
    }
    let firstString = arrayStringhe[0];
    for(let i=0; i<arrayStringhe.length; i++){
        if(arrayStringhe[i].length > firstString.length){
            firstString = arrayStringhe[i];
        }
    }
    return firstString;
}
const parole = ["Mela", "Banana", "Ciliegia", "Dattero", "Uva"];
console.log("La Stringa più lunga è: "+stringLong(parole)); 

