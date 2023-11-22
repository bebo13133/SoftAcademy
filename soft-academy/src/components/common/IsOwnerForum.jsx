import { Navigate, Outlet, useParams } from "react-router-dom"


import useForumOwnerShip from "../Hooks/useForumOwnerShip"

const IsOwnerForum = ({ children }) => {

    const { forumId } = useParams()
    // const { selectCourse } = useCourseContext()


    const isOwner = useForumOwnerShip(forumId)



    if (!isOwner) {
        return <Navigate to={`/forum/${forumId}`} replace />

    }

    return children ? children : <Outlet />

}
export default IsOwnerForum