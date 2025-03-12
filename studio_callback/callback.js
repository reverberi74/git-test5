function saluta(nome, callback) {
    console.log("Ciao, " + nome);
    callback();  // Esegue la funzione passata come argomento
}

saluta("Mario", function() {
    console.log("Benvenuto!");
});