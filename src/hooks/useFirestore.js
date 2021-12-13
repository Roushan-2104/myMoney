import { useState,useEffect,useReducer } from "react";
import { projectFirestore,timeStamp } from "../config/config";

let initialState = {
    document: null,
    isPending:false,
    error:null,
    success: null,
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending:true, document:null, success:false, error:null}

        case 'ADDED_DOC':
            return { isPending:false, document:action.payload ,success:true, error:null}

        case 'ERROR':
            return {error:action.payload, isPending:false, success:false, document:null}

        case 'DELETED':
            return {isPending:false,document:null, success:true, error:null}

    
        default:
            return state;
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer,initialState)
    const [isCancel, setIsCancel] = useState(false)


    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCancelled = (action) => {
        if(!isCancel){
            dispatch(action)
        }


    }

    const addDocument = async (doc) => {
        dispatch({type:'IS_PENDING'})

        try {
            const createdAt = timeStamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({type:'ADDED_DOC' , payload:addedDocument})


        } catch (err) {
            dispatchIfNotCancelled({tpe:'ERROR', payload:err.message})
        }
    }

    const deleteDocument = async (id) => {
        dispatch({type:'IS_PENDING'})
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type:'DELETED'})

        } catch (err) {
            dispatchIfNotCancelled({tpe:'ERROR', payload:err.message})
        }
    }


    useEffect(() => {
        return () => setIsCancel(true)
    }, [])

    return {addDocument,deleteDocument,response}
}