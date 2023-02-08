import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timeStamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };

    case "ADDED_DOC":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function useFirestore(collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCanceled, setIsCanceled] = useState(false);

  //  collection reference
  const ref = projectFirestore.collection(collection);

  // only dispatch is not cancelled
  const dispatchIfNotCanceled = (action) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timeStamp.fromDate(new Date());
      const addedDocuemnt = await ref.add({ ...doc, createdAt });
      dispatchIfNotCanceled({ type: "ADDED_DOC", payload: addedDocuemnt });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCanceled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: "Could not delete" });
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { addDocument, deleteDocument, response };
}

export default useFirestore;
