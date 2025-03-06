/*crea una funzione che accetta un numero come
 parametro e restituisce la somma delle cifre di quel numero*/ 
 function sommaCifre(number){
    let output = 0;
    let split = 0;
    split = number.toString().split('').map(Number);
    for(i = 0; i < split.length; i++){
        output += split[i];
    }
     return output;
 }
 console.log("La somma delle cifre del numero dato è: "+sommaCifre(123)); // output 6
 console.log("La somma delle cifre del numero dato è: "+sommaCifre(1234)); // output 10
 console.log("La somma delle cifre del numero dato è: "+sommaCifre(1349)); // output 17