function sommaCifre(numero) {
    let somma = 0;
    let numeroStringa = numero.toString(); // Convertiamo il numero in stringa
    for (let i = 0; i < numeroStringa.length; i++) {
        somma += parseInt(numeroStringa[i], 10); // Convertiamo il carattere in numero (base 10) e lo sommiamo
    }
    
    return somma;
}

console.log("La somma delle cifre del numero è: "+sommaCifre(123)); // output 6
console.log("La somma delle cifre del numero è: "+sommaCifre(1236)); // output 12