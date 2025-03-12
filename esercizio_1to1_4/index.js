// creare una funzione che prenda in input un array di stringhe
//  e ritorni per ogni stringa il numero totale di caratteri
function totCharacters(arrString) {
    if (!Array.isArray(arrString) || arrString.length === 0) {
        console.log("Insert valid array");
        return;
    }
    for (let i = 0; i < arrString.length; i++) {
        let count = 0;
        let firstString = arrString[i];
        for (let z = 0; z < firstString.length; z++) {
            count++;
        }
        console.log("La stringa " + arrString[i] + " ha " + count + " caratteri");
    }
    return totCharacters;
}

const stringhe = ["Mela", "Tappo", "Calcolatrice", "Tegame", "elettrocardiogramma"];
totCharacters(stringhe);