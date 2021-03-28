import React, { useEffect, useState } from 'react';
import { db } from '../firebase.js'

const useQueryDocs = (collection, doc, updated) => {
    
    const [docs, setDocs] = useState(null);

    //Alternatively could use listener
    useEffect(() => {
        const data = async () => {
            if (doc) {
                const dbData = await db.collection(collection).doc(doc.uid).get();
                setDocs(dbData.data());
            }
        }
        data();
    }, [collection, doc, updated])

    return { docs }
    
}

export default useQueryDocs;