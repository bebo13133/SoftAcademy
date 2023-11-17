import { Navigate, Outlet, useParams } from "react-router-dom"
import { useCourseContext } from "../contexts/CourseContext"
import { useAuthContext } from "../contexts/UserContext"

export const IsAdmin = ({ children }) => {
 
    const { userEmail } = useAuthContext()


    if (userEmail !== "peter@abv.bg") {
        return <Navigate to={`/`} replace />
    }

    return children ? children : <Outlet />
}