import React, { useEffect, useState } from "react";
import { db } from '../firebase'

const PREFIX = "cards-";
const useSessionStorage = (key, initialValue, user) => {
  
  const prefixedKey = PREFIX + key;

  const [result, setResult] = useState(null);
  const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      setResult(JSON.parse(jsonValue));
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      setResult(initialValue());
      return initialValue();
    } else {
      setResult(initialValue);
      return initialValue;
    }
  });
  
  useEffect(() => {
    const data = async () => {
      if (user) {
        const userData = await db.collection('users').doc(user.uid).get();
        setResult(userData.data()[key]);
      }
      else {
          sessionStorage.setItem(prefixedKey, JSON.stringify(value));
          setResult(value);
      }
    }
    data();
  }, [value, user]);

  return { setValue, result };
};

export default useSessionStorage;
