
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/UserContext'
import './oneForumPost.css'


export const OneForumPost = ({
    imageUrl,
    title,
    description,
    author,
    createdAt,
    _id,

}) => {
    const navigate = useNavigate()
    const { isAuthentication } = useAuthContext()

    const forumId = _id

    const handleClick = () => {
     
        return isAuthentication ? navigate(`/forum/${forumId}`) : alert("You don't have permission to that forum. Log in and try again")

    }




    return (

        <>
         
            <div className="article-students">
                <img src={imageUrl} alt={title} />
                <div className="article-details">
                    <h2>{title}</h2>
                    <p>{description && description.slice(0, 140)}</p>
                    <p>
                        <strong>Author: </strong>{author}
                    </p>
                    <p>
                        <strong>Created at:</strong> {createdAt}
                    </p>
                    <button className="read-more-button" onClick={handleClick}>Read More</button>
                </div>
            </div>

        </>

    )
}