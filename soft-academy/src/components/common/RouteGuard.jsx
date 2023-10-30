import { useAuthContext } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom"

export const RouteGuard = ({children}) => {
    const { isAuthentication } = useAuthContext()

    if (!isAuthentication) {

        return <Navigate to={'/login'} />
    }
    return (
       children? children: <Outlet />
    )
}

