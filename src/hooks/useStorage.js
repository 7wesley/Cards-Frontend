import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const PREFIX = "cards-";

/**
 * Manages the data of a guest user or a registered user
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} initialData - the data to manage
 * @returns the user's data and the function to update the storage
 */
const useStorage = (initialData) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [newData, setNewData] = useState(initialData);

  /**
   * Updates the storage from the given data
   * @param {*} updatedData the data to update
   */
  const updateStorage = async (updatedData) => {
    if (currentUser) {
      for (const [key, value] of Object.entries(updatedData))
        await db
          .collection("users")
          .doc(currentUser.uid)
          .update({
            [key]: value,
          });
    }
    setNewData(updatedData);
  };

  /**
   * For setting a logged-in user's data or for setting a guest user's
   *  temporary storage
   */
  useEffect(() => {
    const data = async () => {
      if (currentUser) {
        const dbData = await db.collection("users").doc(currentUser.uid).get();
        setUserData(dbData.data());
      } else {
        let filteredData = {};
        for (const [key, value] of Object.entries(newData)) {
          sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
        }
        for (const [key, value] of Object.entries(sessionStorage)) {
          filteredData[key.replace(PREFIX, "")] = JSON.parse(value);
        }
        setUserData(filteredData);
      }
    };
    data();
  }, [newData, currentUser]);

  return { userData, updateStorage };
};

export default useStorage;
