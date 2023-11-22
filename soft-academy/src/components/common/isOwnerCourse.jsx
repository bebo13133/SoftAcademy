import { Navigate, Outlet, useParams } from "react-router-dom"
import { useCourseContext } from "../contexts/CourseContext"

import  useCourseOwnership  from "../Hooks/useCourseOwnerShip"

const IsOwnerCourse = ({ children }) => {
    const { courseId } = useParams()
    // const { selectCourse } = useCourseContext()
 

    const isOwner = useCourseOwnership(courseId)



     if (!isOwner){
     return <Navigate to={`/catalog/${courseId}`} replace />
  
      }
     return  children ? children : <Outlet />

}
export default IsOwnerCourse