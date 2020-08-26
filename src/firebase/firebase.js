import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app;
        this.auth = app.auth();
        this.db = app.firestore();
    }

    registerUser = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    login = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    logout = () => this.auth.signOut();

    resetPassword = (email) => this.auth.sendPasswordResetEmail(email);
    
    changePassword = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;