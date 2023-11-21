import { ConfirmBox } from "../../ConfirmBox/ConfirmBox"
import '../../AdminDashboard/rowSection.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForumContext } from "../../contexts/ForumContext"
import { forumServiceFactory } from "../../Services/forumService"
import { useService } from "../../Hooks/useService"
export const RowSectionForum = ({ _id, title,
    author,
    createdAt,
    onDeleteClick
}) => {
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const forumService = useService(forumServiceFactory)

    const forumId = _id
    const navigate = useNavigate()


    const fetchData = async () => {
        try {
            const commentForum = await forumService.getAllPosts(forumId)
            setComments(commentForum)

            const forumLikes = await forumService.getAllForumLikes(forumId)
          
            const likesForum = forumLikes.filter(x => x.forumId === forumId)
            setLikes(likesForum)
        } catch (error) {
            console.log("Error fetching forum post", error);
        }

    }



    const onNavigateDetails = () => {

        navigate(`/admin/all-forums/${forumId}`)

    }
    const openDelete = () => {
        setIsOpen(true)
    }
    const onCloseDelete = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        fetchData()

    }, [])


    return (

        <>
            <div className="row-section-course">
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Forum Name:</strong> {title}</p>

                <p><strong>Author:</strong> {author}</p>
                <p><strong>Created On:</strong> {createdAt}</p>
                <p><strong>Comments</strong> {comments.length}</p>
                <p><strong>Likes</strong> {likes.length}</p>





                <button className="btn-primary-course" onClick={onNavigateDetails}> Details</button>
                <button className="btn-delete-course" onClick={() => openDelete()}> Delete</button>
            </div>
            <ConfirmBox key={_id} open={isOpen} closeDialog={() => onCloseDelete()}                // title={deleteData?.name}
                deleteFunction={() => { setIsOpen(false), onDeleteClick(forumId) }} />
        </>
    )
}