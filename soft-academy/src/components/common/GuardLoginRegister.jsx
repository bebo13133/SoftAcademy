import { PageNotFound } from "../404/PageNotFound"
import { useAuthContext } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom"

export const GuardLoginRegister = ({ children }) => {
    const { isAuthentication } = useAuthContext()

    if (isAuthentication) {

        return <Navigate to='/' replace/>
    }
    return (
        children ? children : <PageNotFound />
    )
}
