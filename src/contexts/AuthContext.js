/**
 * Handles how the user information is used and created by using a reference to
 *  firebase
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useContext, useState, useEffect } from "react";
import { auth, db, dbStorage, timestamp } from "../firebase";

const AuthContext = React.createContext();

/**
 * For using the authentication system
 * @returns the current context value
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Finds the AuthContext Provider of the children
 * @param {any} children the children to find the provider for
 * @returns the AuthContext Provider
 */
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  /**
   * Checks the given username
   * @param {any} username the name to check
   */
  const usernameCheck = async (username) => {
    if (/[^a-zA-Z0-9]/.test(username))
      throw new Error("Username should only contain letters and numbers");
    if (username.length < 3)
      throw new Error("Username should be 3 characters or longer");
    const doc = await db.collection("usernames").doc(username).get();
    if (doc.exists) throw new Error("Username already taken!");
  };

  /**
   * If the user is wanting to create an account
   * @param {any} username the name to create an account with
   * @param {any} email the email to create an account with
   * @param {any} password the password to create the account with
   */
  const signup = async (username, email, password) => {
    await usernameCheck(username);
    const user = await auth.createUserWithEmailAndPassword(email, password);

    await db
      .collection("users")
      .doc(user.user.uid)
      .set({
        username: username,
        createdAt: timestamp(),
        id: user.user.uid,
        stats: {
          Wins: 0,
          Losses: 0,
          Played: 0,
        },
      });
    await db.collection("usernames").doc(username).set({
      uid: user.user.uid,
    });
  };

  /**
   * For if the user wants to upload an image to their profile
   * @param {any} file the image to upload
   */
  const upload = async (file) => {
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      let storage = dbStorage.ref().child(file.name);
      await storage.put(file);
      const url = await storage.getDownloadURL();
      await db.collection("users").doc(currentUser.uid).update({
        picture: url,
      });
    }
  };

  /**
   * Sets a new value for the user's username
   * @param {any} username the new name of the user to set
   */
  const updateProfile = async (username) => {
    await usernameCheck(username);
    let user = await db.collection("users").doc(currentUser.uid).get();
    await db.collection("usernames").doc(user.data().username).delete();
    await db.collection("usernames").doc(username).set({
      uid: currentUser.uid,
    });
    await db.collection("users").doc(currentUser.uid).update({
      username,
    });
  };

  /**
   * Allows the user to login to their account
   * @param {any} email the email of the account to login with
   * @param {any} password the password of the account to login with
   */
  const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  /**
   * Logs the user out of thier account
   * @returns the account being logged out of
   */
  const logout = () => {
    return auth.signOut();
  };

  /**
   * For if the user wants to reset their passowrd
   * @param {any} email the email of the account to reset the password with
   * @returns the account that the password is being reset for
   */
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  /**
   * Updates the email of an account
   * @param {any} email the new email to update for the user
   * @returns the user that this email will update for
   */
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  /**
   * Updates the password of a user
   * @param {any} password the new password to set with
   * @returns the user who wants to update their password
   */
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  /**
   * Initializes the values to use
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
