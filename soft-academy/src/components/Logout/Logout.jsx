import { useEffect } from "react"
import { useAuthContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"



export const Logout = ()=>{

const {onLogout} = useAuthContext()
    useEffect(()=>{
    onLogout()
// localStorage.clear()

    },[onLogout])
    
    return <Navigate to="/"/>

}