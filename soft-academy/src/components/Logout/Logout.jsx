import { useEffect } from "react"
import { useAuthContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';


export const Logout = ()=>{
    const [cookies, setCookies] = useCookies(["cookieConsent"]) // взимам стейта на кикитата за да мога  да ги изтрияч
const {onLogout} = useAuthContext()


    useEffect(()=>{
    onLogout()
// localStorage.clear()
setCookies("cookieConsent", null, { path: "/" })
    },[onLogout])
    
    return <Navigate to="/"/>

}