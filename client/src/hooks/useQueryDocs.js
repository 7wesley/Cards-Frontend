/**
 * For adding a document to the query in firebase
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import { useEffect, useState } from 'react';
import { db } from '../firebase.js'

/**
 * Updates the query in firebase and sets the new data to it
 * @param {*} collection the collection to add to
 * @param {*} doc the document to set the data for
 * @param {*} updated if the data was set
 * @returns the documents that was updated
 */
const useQueryDocs = (collection, doc, updated) => {
    
    const [docs, setDocs] = useState(null);

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