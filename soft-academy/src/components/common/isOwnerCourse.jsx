import { Navigate, Outlet, useParams } from "react-router-dom"
import { useCourseContext } from "../contexts/CourseContext"
import { useAuthContext } from "../contexts/UserContext"

export const isOwnerCourse = ({ children }) => {
    const { courseId } = useParams
    const { selectCourse } = useCourseContext()
    const { userId } = useAuthContext()
    const currentCourse = selectCourse(courseId) // взимаме курса от стейта //

    if (currentCourse._ownerId !== userId) {
        return <Navigate to={'/catalog/:courseId'} />
    }

    return children ? children : <Outlet />
}