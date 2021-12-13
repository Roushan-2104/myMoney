import {useEffect, useState} from 'react'
import {projectAuth} from '../config/config'
import {useAuthContext} from './useAuthContext'

export const useLogOut = () => {
    const [isCancel, setIsCancel] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async () => { 
        setError(null)
        setIsPending(true)

        // sign the user out

        try {
            await projectAuth.signOut()

            // dispatch
            dispatch({type: 'LOGOUT'})
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
    return {logout,error, isPending,isCancel}
}