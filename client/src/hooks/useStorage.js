import { useEffect, useState } from "react";
import { db } from '../firebase'
import { useAuth } from "../contexts/AuthContext";

//Passes in data always assuming it will update the session storage,
//however, if a user is logged in, data from the database will be returned
const PREFIX = "cards-";
const useStorage = (initialData) => {
  
    //const prefixedKey = PREFIX + key;
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [newData, setNewData] = useState(initialData);

    //Using this method instead of constantly listening
    //for storage changes prevents users from setting
    //their own usernames through browser settings
    const updateStorage = async (updatedData) => {
      if (currentUser) {
        for (const [key, value] of Object.entries(updatedData))
          await db.collection('users').doc(currentUser.uid).update({ 
            [key]: value
        })
      }
      setNewData(updatedData);
    }
  
    useEffect(() => {
      const data = async () => {
        if (currentUser) {
          const dbData = await db.collection('users').doc(currentUser.uid).get();
          setUserData(dbData.data());
        }
        else {
          let filteredData = {};
          for (const [key, value] of Object.entries(newData)) {
            sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
          }
          for (const [key, value] of Object.entries(sessionStorage)) { 
            filteredData[key.replace(PREFIX, '')] = JSON.parse(value);
          }
          setUserData(filteredData);
        }
      }
      data();
    }, [newData, currentUser]);

  return { userData, updateStorage };
};

export default useStorage;
