const db = {
    users: [
        { id: 1, role: "admin", email: "ale@gmail.com", password: "1234" },
        { id: 2, role: "guest", email: "luca@gmail.com", password: "2345" },
        { id: 3, role: "admin", email: "rachele@gmail.com", password: "3456" },
        { id: 4, role: "guest", email: "jahvantè@gmail.com", password: "4567" },
        { id: 5, role: "guest", email: "mirko@gmail.com", password: "5678" },
    ]
}
 
 /**
 * Funzione di login
 * @param {object} payload - Dati di accesso
 * @param {string} payload.email - Email dell'utente
 * @param {string} payload.password - Password dell'utente
 * @param {string} [payload.role] - Ruolo dell'utente (opzionale)
 * @param {(user: object) => {}} onSuccess - Callback in caso di successo
 * @param {(error: Error) => {}} onError - Callback in caso di errore
 */
const login = (payload, onSuccess, onError) => {
    // Controlli sui parametri
    if (!payload || typeof payload !== "object") {
        return onError(new Error("Payload must be an object"));
    }

    // Trova l'utente nel database
    const user = db.users.find((item) => item.email === payload.email);

    if (!user) {
        return onError(new Error("User not found"));
    }

    if (user.password !== payload.password) {
        return onError(new Error("Wrong password"));
    }

    return onSuccess(user);
};

// Callback di successo
const handleSuccess = (user) => {
    console.log("Login riuscito! Benvenuto, " + user.email);
};

// Callback di errore
const handleError = (error) => {
    console.error("Errore:", error.message);
};

// Chiamata alla funzione di login
login(
    { email: "ale@gmail.com", password: "1234" },
    handleSuccess,
    handleError
);
