/**
 * Scriviamo una funzione che ci permette di effettuare il login.
 * L'utente può inserire email e password che se sono corretti permettono di restituire
 * l'oggetto che corrisponde all'untente che sta tentando il login, altrimenti mi restituisce un errore,
 * 
 * 1. Definire una base dati (db) su cui lavorare;
 * 2. Scrivere una funzione di login
 * 2.1 Gestione dei paramentri:
 *  - payload -> Obj che contiene le chiavi email e password
 *  - onSuccess -> Callback che verrà eseguita solo se tutte le operazioni vanno a buon fine e che passa come primo parametro l'utente oggeto di login;
 *  - onError -> Callback che verrà eseguita qualora si verifichi un errore qualsiasi e passa l'errote come primo paramentro
 * 2.2 Controlliamo i paramentri inseriti dall'utente
 *  - payload è obbligatorio e deve essere un obj
 *  - onSuccess non è obbligatorio e deve essere una funzione
 *  - onError non è obbligatrorio e deve essere una funzione
 * 2.3 Andiamo a cercare nella nostra base dati l'utente che corrisponde all'email passata dentro payload
 * 2.4 Se l'email è corretta, troveremo l'utente e procediamo altrimenti si esegue onError
 * 2.5 Andiamo a effettuare un controllo sulla password
 * 2.6 Se la password è errata eseguiamo onError altrimenti procediamo
 * 2.7 Se tutto va a buon fine eseguiamo onSuccess e passiamo l'utente trovato come parametro
 */

const db = {
    users: [
        { id: 1, role: "admin", email: "ale@gmail.com", password: "1234" },
        { id: 2, role: "guest", email: "luca@gmail.com", password: "2345" },
        { id: 3, role: "admin", email: "rachele@gmail.com", password: "3456" },
        { id: 4, role: "guest", email: "jahvantè@gmail.com", password: "4567" },
        { id: 5, role: "guest", email: "mirko@gmail.com", password: "5678" },
    ]
}

const DEFAULT_EXEC_CB_OPTIONS = {
    mode: "ERROR", // ERROR | SUCCESS
    payload: null, // string | object
}

const utilities = {
    /**
     * Execute callback with controls
     * @param {(payload: string|object) => {}} cb 
     * @param {object} options 
     * @param {string} [options.mode] 
     * @param {string|object} [options.payload] 
     */
    execCb: (cb, options = { ...DEFAULT_EXEC_CB_OPTIONS }) => {
        options = { ...DEFAULT_EXEC_CB_OPTIONS, ...options }

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
    },
}

const DEFAULT_LOGIN_PAYLOAD = {
    role: "guest"
}

/**
 * User login function
 * @param {object} payload 
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} [payload.role]
 * @param {(user: object) => {}} onSuccess 
 * @param {(error: Error) => {}} onError 
 */
const login = (payload, onSuccess, onError) => {
    payload = { ...DEFAULT_LOGIN_PAYLOAD, ...payload };

    if (!payload || typeof payload != "object" || Array.isArray(payload)) {
        return utilities.execCb(onError, { payload: "Payload must be an object" });
    }

    if (!payload.email || typeof payload.email !== "string") {
        return utilities.execCb(onError, { payload: "email must be a valid string" });
    }

    if (!payload.password || typeof payload.password !== "string") {
        return utilities.execCb(onError, { payload: "password must be a valid string" });
    }
    
    if (!payload.role || typeof payload.role !== "string") {
        return utilities.execCb(onError, { payload: "role must be a valid string" });
    }

    const user = db.users.find((item) => {
        return payload.email == item.email; // true - false
    });

    if (user == null) {
        return utilities.execCb(onError, { payload: "User not found" });
    }

    if (user.password !== payload.password) {
        return utilities.execCb(onError, { payload: "Wrong password" });
    }

    if (user.role !== payload.role) {
        return utilities.execCb(onError, { payload: "Not Authorized" });
    }

    return utilities.execCb(onSuccess, { mode: "SUCCESS", payload: user });
}

const handleSuccess = (user) => {
    console.log(user)
}

const handleError = (error) => {
    console.log(error);
    // Emettere una notifica
    // Fare un file di log con l'errore
    // Salvare l'errore su db
    // Mandare un'email con il log errore
    // Fare un clear dei log errore precedenti
}

const getData = (email, password, role) => {
    return {
        email, // email: email 
        password, // password: password
        role // role: role
    };
}

/*login(getData(
    prompt("Inserisci la tua email"), 
    prompt("Inserisci la tua password"), 
    prompt("Qual è il tuo ruolo?")
), handleSuccess, handleError);*/

/**
 * Get all users by role name
 * @param {string} role 
 * @param {(user: object) => {}} onSuccess 
 * @param {(error: Error) => {}} onError 
 * @returns {object[]}
 */
const getUsersByRoleName = (role, onSuccess, onError) => {
    if (!role || typeof role !== "string") {
        return utilities.execCb(onError, { payload: "role must be a valid string" });
    }

    const users = db.users.filter((item) => { // [] | [{}]
        return item.role == role; // true - false
    });

    if (users.length == 0) {
        return utilities.execCb(onError, { payload: `users with ${role} role not found` });
    }

    return utilities.execCb(onSuccess, { mode: "SUCCESS", payload: users });
}

 login({
    email:"luca@gmail.com",
    password: "2345",
 }, (user) => {
    console.log(user);
 }, (error) =>{
    console.log(error);
 });

 getUsersByRoleName("admin", (user) => console.log(user), (error) => console.log(error));
 getUsersByRoleName("guest", (user) => console.log(user), (error) => console.log(error));

