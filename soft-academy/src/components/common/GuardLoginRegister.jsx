import { PageNotFound } from "../404/PageNotFound"
import { useAuthContext } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom"

export const GuardLoginRegister = ({ children }) => {
    const { isAuthentication } = useAuthContext()

    if (isAuthentication) {

        return <Navigate to={'/404'} />
    }
    return (
        children ? children : <PageNotFound />
    )
}
