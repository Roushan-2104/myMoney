import { useState,useEffect } from "react"
import { projectAuth } from "../config/config"
import {useAuthContext} from './useAuthContext'


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isCancel, setIsCancel] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email,password)

            if(!res){
                throw new Error('Could Not Complete Sign-In')
            }
            dispatch({type:'LOGIN',payload: res.user})

            if(!isCancel){
                setIsPending(false)
                setError(null)
            }
            
        } catch (err) {
            if(!isCancel){
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancel(true)
    }, [])
    return {error, isPending,login,isCancel}

}