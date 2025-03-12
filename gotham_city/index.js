/*Il carcere di Gotham City
  Sei appena stato nominato direttore presso il carcere di Gotham City.
  Hai l'arduo compito di scrivere un programma che gestisca:
  - I dati anagrafici delle guardie
  - I dati anagrafici dei detenuti
  - I fascicoli personali dei detenuti, che devono contenere almeno queste informazioni:
      - Un identificativo del criminale
      - La data di carcerazione
      - La data di scarcerazione
      - Il crimine commesso

  Visto che sei tu il capo, decidi se usare lo stesso oggetto per gestire sia le guardie che i criminali.
  In ogni caso dovrai definire la banca dati della prigione: crea un array di guardie, uno di detenuti e uno per i fascicoli.

  Prevedi la possibilià di:
    - Assumere nuove guardie
    - Schedare nuovi carcerati
    - Aggiungere nuovi fascicoli
    - Visualizzare l'elenco per ciascuna categoria (guardie, criminali, fascicoli)
    - Effettuare ricerche nei fascicoli per nome del detenuto

  Nel carcere di Gothma City non tutti i detenuti arrivano alla data di scarcerazione,
  gestisci l’eventualità in cui un detenuto sia evaso e quella in cui sia deceduto.

  Scrivi una funzione di riepilogo dell'andamento del carcere e che stampi:
    - il numero delle guardie,
    - il numero di detenuti totali,
    - il numero di detenuti evasi,
    - il numero di detenuti deceduti all’interno della struttura.*/ 
    class Person {
        constructor(id, name, age, role) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.role = role;
        }
    }
    
    class Criminal extends Person {
        constructor(id, name, age, crimeId, incarcerationDate, releaseDate, crime) {
            super(id, name, age, "Criminal");
            this.crimeId = crimeId;
            this.incarcerationDate = incarcerationDate;
            this.releaseDate = releaseDate;
            this.crime = crime;
            this.status = "Incarcerated"; // Possible statuses: "Incarcerated", "Escaped", "Deceased"
        }
    }
    
    class Prison {
        constructor() {
            this.guards = [];
            this.criminals = [];
            this.records = [];
        }
    
        hireGuard(id, name, age) {
            this.guards.push(new Person(id, name, age, "Guard"));
        }
    
        imprisonCriminal(id, name, age, crimeId, incarcerationDate, releaseDate, crime) {
            const criminal = new Criminal(id, name, age, crimeId, incarcerationDate, releaseDate, crime);
            this.criminals.push(criminal);
            this.records.push(criminal);
        }
    
        listGuards() {
            console.log("Guards:", this.guards);
        }
    
        listCriminals() {
            console.log("Criminals:", this.criminals);
        }
    
        listRecords() {
            console.log("Records:", this.records);
        }
    
        findRecordByName(name) {
            return this.records.filter(record => record.name.toLowerCase().includes(name.toLowerCase()));
        }
    
        markEscape(id) {
            const criminal = this.criminals.find(c => c.id === id);
            if (criminal) {
                criminal.status = "Escaped";
            }
        }
    
        markDeceased(id) {
            const criminal = this.criminals.find(c => c.id === id);
            if (criminal) {
                criminal.status = "Deceased";
            }
        }
    
        prisonSummary() {
            const totalGuards = this.guards.length;
            const totalCriminals = this.criminals.length;
            const escapedCriminals = this.criminals.filter(c => c.status === "Escaped").length;
            const deceasedCriminals = this.criminals.filter(c => c.status === "Deceased").length;
            
            console.log("Prison Summary:");
            console.log("Guards:", totalGuards);
            console.log("Total Criminals:", totalCriminals);
            console.log("Escaped Criminals:", escapedCriminals);
            console.log("Deceased Criminals:", deceasedCriminals);
        }
    }
    
    // Example usage
    const gothamPrison = new Prison();
    gothamPrison.hireGuard(1, "Jim Gordon", 50);
    gothamPrison.imprisonCriminal(101, "Joker", 45, "C-001", "2023-01-01", "2030-01-01", "Mass Chaos");
    gothamPrison.imprisonCriminal(102, "Penguin", 40, "C-002", "2022-06-15", "2028-06-15", "Organized Crime");
    gothamPrison.markEscape(101);
    gothamPrison.markDeceased(102);
    gothamPrison.prisonSummary();
    