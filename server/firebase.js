/**
 * For creating the query in firebase
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */
const firebase = require("firebase");
require("dotenv").config();

firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

module.exports = {
    db: firebase.firestore(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp,
    increment: firebase.firestore.FieldValue.increment,
    del: firebase.firestore.FieldValue.delete,
};
