import React, { useEffect, useState } from "react";
import { db } from '../firebase'
import { useAuth } from "../contexts/AuthContext";

const PREFIX = "cards-";
const useStorage = (key, initialValue) => {
  
    const prefixedKey = PREFIX + key;
    const { currentUser } = useAuth();
    const [result, setResult] = useState(null);
    const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(prefixedKey);
    if (jsonValue != null) {
        setResult(JSON.parse(jsonValue));
        return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
        setResult("Guest-" + initialValue());
        return "Guest-" + initialValue()
    } else {
        setResult(`Guest-${initialValue}`);
        return `Guest-${initialValue}`;
    }
  });
  
  useEffect(() => {
    const data = async () => {
      if (currentUser) {
        const userData = await db.collection('users').doc(currentUser.uid).get();
        setResult(userData.data()[key]);
      }
      else {
          sessionStorage.setItem(prefixedKey, JSON.stringify(value));
          setResult(value);
      }
    }
    data();
  }, [value, currentUser]);

  return { setValue, result };
};

export default useStorage;
