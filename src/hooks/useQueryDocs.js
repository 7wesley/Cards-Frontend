import { useEffect, useState } from "react";
import { db } from "../firebase.js";

/**
 * Queries the database for the specificied collection and document
 * and returns it with a state hook
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} collection - The collection to query
 * @param {*} doc - The document to query
 * @param {*} updated - If the document needs to be requeried
 * @returns the queried document
 */
const useQueryDocs = (collection, doc, updated) => {
  const [docs, setDocs] = useState(null);

  /**
   * For setting the document's data
   */
  useEffect(() => {
    const data = async () => {
      if (doc) {
        const dbData = await db.collection(collection).doc(doc.uid).get();
        setDocs(dbData.data());
      }
    };
    data();
  }, [collection, doc, updated]);

  return { docs };
};

export default useQueryDocs;
