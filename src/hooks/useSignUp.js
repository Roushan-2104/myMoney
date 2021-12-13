import { useState,useEffect } from "react"
import { projectAuth } from "../config/config"
import {useAuthContext} from './useAuthContext'

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isCancel, setIsCancel] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email,password,displayName) => {
        setError(null)
        setIsPending(true)

        try { 
            const res =  await projectAuth.createUserWithEmailAndPassword(email,password)
            
            if(!res){
                throw new Error('Could Not Complete Sign-Up')
            }

            //add display name
            await res.user.updateProfile({ displayName })

            //dispatch Login
            dispatch({type:'LOGIN',payload: res.user})

            if(!isCancel){
                setIsPending(false)
                setError(null)
            }
        } 
        catch (err) {
            if(!isCancel){
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancel(true)
    }, [])
    return {error, isPending,signup,isCancel}
}