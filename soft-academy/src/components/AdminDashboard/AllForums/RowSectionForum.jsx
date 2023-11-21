import { ConfirmBox } from "../../ConfirmBox/ConfirmBox"
import '../../AdminDashboard/rowSection.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForumContext } from "../../contexts/ForumContext"
export const RowSectionForum = ({ _id, title,
    author,
    createdAt,
    onDeleteClick
}) => {

    const [isOpen, setIsOpen] = useState(false)

    const forumId = _id
    const navigate = useNavigate()
   
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


    }, [onCloseDelete,])


    return (

        <>
            <div className="row-section-course">
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Forum Name:</strong> {title}</p>

                <p><strong>Author:</strong> {author}</p>
                <p><strong>Created On:</strong> {createdAt}</p>
                <p><strong>Comments</strong> 1</p>
                <p><strong>Likes</strong> 1</p>






                <button className="btn-primary-course" onClick={onNavigateDetails}> Details</button>
                <button className="btn-delete-course" onClick={() => openDelete()}> Delete</button>
            </div>
            <ConfirmBox key={_id} open={isOpen} closeDialog={() => onCloseDelete()}                // title={deleteData?.name}
                deleteFunction={() => { setIsOpen(false), onDeleteClick(forumId) }} />
        </>
    )
}