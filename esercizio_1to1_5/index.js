//crea una funzione che restituisce un array con i primi x numeri a partire da un numero n
function nNumeri (a, b){
    let arrayRitorno = [];
   for (let i = 0; i <= b; i++){
    arrayRitorno.push(a + i);
   }
   return arrayRitorno;
}


console.log(nNumeri(4, 8)); // [4, 5, 6, 7, 8, 9, 10, 11]
console.log(nNumeri(5, 6));  // [5, 6, 7, 8, 9, 10]