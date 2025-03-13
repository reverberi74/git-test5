const db = {
    users: [
        { id: 1, role: "admin", email: "ale@gmail.com", password: "1234" },
        { id: 2, role: "guest", email: "luca@gmail.com", password: "2345" },
        { id: 3, role: "admin", email: "rachele@gmail.com", password: "3456" },
        { id: 4, role: "guest", email: "jahvantè@gmail.com", password: "4567" },
        { id: 5, role: "guest", email: "mirko@gmail.com", password: "5678" },
    ]
};

/*state è un oggetto che rappresenta lo stato dell'applicazione.
currentUser è inizialmente impostato su null e verrà aggiornato con l'utente attualmente loggato.*/
const state = {
    currentUser: null
};

/*execCb(cb, options):
Funzione che esegue una callback (cb) passando un messaggio di errore o un risultato.
Se il mode è "ERROR":
Controlla se cb è una funzione.
Se lo è, la esegue con un errore.
Se non lo è, lancia un errore.
Se il mode è "SUCCESS":
Controlla se cb è una funzione.
Se lo è, la esegue con il payload di successo.
Se non lo è, lancia un errore.*/
const utilities = {
    execCb: (cb, options) => {
        if (options.mode === "ERROR") {
            if (typeof cb === "function") {
                return cb(new Error(options.payload));
            } else {
                throw new Error(options.payload);
            }
        } else if (options.mode === "SUCCESS") {
            if (typeof cb === "function") {
                return cb(options.payload);
            } else {
                throw new Error("onSuccess must be a function");
            }
        }
    }
};

/**
login(payload, onSuccess, onError):
Funzione che autentica un utente.
Accetta un oggetto payload con le credenziali.
Accetta due callback: onSuccess (se il login ha successo) e onError (se fallisce).
 */
const login = (payload, onSuccess, onError) => {
    if (!payload || typeof payload !== "object") {
        return utilities.execCb(onError, { payload: "Payload must be an object", mode: "ERROR" });
    }
    // Destruttura l'oggetto payload per ottenere email, password e role.
    const { email, password, role } = payload;

    // Controlli su Email, Password e Ruolo
    //Verifica se email è assente o non è una stringa così come password o ruolo
    if (!email || typeof email !== "string") {
        return utilities.execCb(onError, { payload: "Email must be a valid string", mode: "ERROR" });
    }

    if (!password || typeof password !== "string") {
        return utilities.execCb(onError, { payload: "Password must be a valid string", mode: "ERROR" });
    }

    if (!role || typeof role !== "string") {
        return utilities.execCb(onError, { payload: "Role must be a valid string", mode: "ERROR" });
    }
    // Cerca un utente nel database che abbia la stessa email inserita nel payload.
    const user = db.users.find(user => user.email === email);
    // Se l'utente non esiste mode sarà Error così come per la password e il ruolo
    if (!user) {
        return utilities.execCb(onError, { payload: "User not found", mode: "ERROR" });
    }

    if (user.password !== password) {
        return utilities.execCb(onError, { payload: "Wrong password", mode: "ERROR" });
    }

    if (user.role !== role) {
        return utilities.execCb(onError, { payload: "Wrong role", mode: "ERROR" });
    }
    // Aggiorna lo stato globale ed Esegue la callback onSuccess passando l'utente loggato.
    state.currentUser = user;
    return utilities.execCb(onSuccess, { mode: "SUCCESS", payload: user });
};

/**
getUsersByRoleName(role, onSuccess, onError):
Filtra gli utenti per ruolo.
Accetta una callback onSuccess se trova utenti.
Usa onError se il ruolo non esiste.
 */
const getUsersByRoleName = (role, onSuccess, onError) => {
    if (!role || typeof role !== "string") {
        return utilities.execCb(onError, { payload: "Role must be a valid string", mode: "ERROR" });
    }
    // Filtra gli utenti che hanno il ruolo richiesto.
    const users = db.users.filter(user => user.role === role);

    if (users.length === 0) {
        return utilities.execCb(onError, { payload: `No users found with role: ${role}`, mode: "ERROR" });
    }

    return utilities.execCb(onSuccess, { mode: "SUCCESS", payload: users });
};

/**
 * Gestione eventi
 * Seleziona il pulsante Login e aggiunge un event listener per il click.
 */
document.getElementById("loginBtn").addEventListener("click", () => {
    /*Recupera i valori di email, password e ruolo dal form.
    Recupera l'elemento HTML dove mostrare il messaggio di errore/successo.*/
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const messageElement = document.getElementById("message");
    /*Chiama la funzione login() con le credenziali fornite.
    Se il login ha successo, aggiorna il messaggio con un testo verde.
    Se fallisce, mostra un messaggio con testo rosso di errore.*/
    login({ email, password, role },
        (user) => {
            messageElement.style.color = "green";
            messageElement.textContent = `Login successful! Welcome, ${user.email}`;
        },
        (error) => {
            messageElement.style.color = "red";
            messageElement.textContent = error.message;
        }
    );
});
// Seleziona il pulsante Cerca e aggiunge un event listener per il click.
document.getElementById("searchBtn").addEventListener("click", () => {
    const role = document.getElementById("searchRole").value;
    const userList = document.getElementById("userList");
    /*Chiama getUsersByRoleName().
    Se trova utenti, li mostra in una lista.
    Se non trova utenti, mostra un messaggio di errore.*/
    getUsersByRoleName(role,
        (users) => {
            userList.innerHTML = "";
            users.forEach(user => {
                const li = document.createElement("li");
                li.textContent = `${user.email} - ${user.role}`;
                userList.appendChild(li);
            });
        },
        (error) => {
            userList.innerHTML = `<li style="color: red;">${error.message}</li>`;
        }
    );
});

