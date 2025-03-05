/**
 * 1. Scrivi una funzione che accetta come parametri un oggetto "user" e un numero;
 * 2. All'interno della funzione controlla se l'età dell'utente è maggiore o minore rispettto
 *    a quella fornita come secondo parametro;
 * 3. Se maggiore restituisci true, altrimenti false;
 * 4. Crea una seconda funzione che in base al risultato della prima fa un console log, se true allora
 *    stampampa in console "Accesso consentito" altrimenti "Accesso negato";
 */
const user = {
    name: "Mario",
    age: 20,
};

function check_age(object, num) {
    if (object.age > num) {
        return true;
    } else {
        return false;
    }
}

const parameters = check_age(user, 10);
console.log(parameters);

function check_result(boolean) {
    if (parameters == true) {
        console.log("Access Allowed");

    } else {
        console.log("Access Denied");
    }
}
check_result(parameters);
