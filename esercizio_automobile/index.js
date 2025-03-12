class Automobile {
    constructor(marca, modello, anno) {
        this.marca = marca;
        this.modello = modello;
        this.anno = anno;
    }

    descrizione() {
        return `Questa automobile è una ${this.marca} ${this.modello} del ${this.anno}.`;
    }
}

// Creazione di un'istanza della classe Automobile
const miaAuto = new Automobile("Toyota", "Corolla", 2022);

// Stampa della descrizione dell'automobile
console.log(miaAuto.descrizione()); // Output: Questa automobile è una Toyota Corolla del 2022.
