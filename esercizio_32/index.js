class Automobile {
    constructor(marca, modello, anno, chilometraggio = 0) {
        this.marca = marca;
        this.modello = modello;
        this.anno = anno;
        this.chilometraggio = chilometraggio;
    }

    descrizione() {
        return `Questa automobile è una ${this.marca} ${this.modello} del ${this.anno}.`;
    }

    aggiungiChilometri(km) {
        if (km > 0) {
            this.chilometraggio += km;
            console.log(`Hai aggiunto ${km} km. Chilometraggio totale: ${this.chilometraggio} km.`);
        } else {
            console.log("Il numero di chilometri deve essere positivo.");
        }
    }

    mostraChilometraggio() {
        return `Il chilometraggio attuale è di ${this.chilometraggio} km.`;
    }
}

// Creazione di un'istanza della classe Automobile
const miaAuto = new Automobile("Toyota", "Corolla", 2022, 5000);

// Mostra la descrizione dell'auto
console.log(miaAuto.descrizione()); // Output: Questa automobile è una Toyota Corolla del 2022.

// Aggiunge chilometri
miaAuto.aggiungiChilometri(1500);

// Mostra il chilometraggio aggiornato
console.log(miaAuto.mostraChilometraggio()); // Output: Il chilometraggio attuale è di 6500 km.
