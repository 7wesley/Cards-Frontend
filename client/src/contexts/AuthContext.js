import React, { useContext, useState, useEffect } from "react"
import { auth, db, dbStorage, timestamp, increment } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState()

    const usernameCheck = async (username) => {
        if (/[^a-zA-Z0-9]/.test(username)) throw 'Username should only contain letters and numbers';
        if (username.length < 3) throw 'Username should be 3 characters or longer'
        const doc = await db.collection('usernames').doc(username).get();
        if (doc.exists) throw 'Username already taken!';
        console.log('nope');
    }
    const signup = async (username, email, password) => {
        await usernameCheck(username);
        const user = await auth.createUserWithEmailAndPassword(email, password)
        await db.collection('users').doc(user.user.uid).set({
            username: username,
            createdAt: timestamp(),
            uid: user.user.uid,
            stats: {
                wins: 0,
                losses: 0,
                played: 0,
            }
        });
        await db.collection('usernames').doc(username).set({
            uid: user.user.uid
        });
    } 

    const upload = async (file) => {
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            let storage = dbStorage.ref().child(file.name)
            await storage.put(file);
            const url = await storage.getDownloadURL();
            console.log(url);
            await db.collection('users').doc(currentUser.uid).update({
                picture: url
            })
        }   
    }

    const updateProfile = async (username) => {
        await usernameCheck(username);
        let user = await db.collection('users').doc(currentUser.uid).get();
        await db.collection('usernames').doc(user.data().username).delete();
        await db.collection('usernames').doc(username).set({
            uid: currentUser.uid
        });
        await db.collection('users').doc(currentUser.uid).update({
            username
        })
    }

    const login = async (email, password) => {
        await auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail(email);
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);  
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        upload,
        updateProfile,
    }

    return (
        <AuthContext.Provider value = {value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}

