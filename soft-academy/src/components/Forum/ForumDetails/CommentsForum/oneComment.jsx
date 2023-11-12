
import { useEffect, useState } from "react"
import { BiLike } from "react-icons/bi"
import { useAuthContext } from "../../../contexts/UserContext"
import { useService } from "../../../Hooks/useService"
import { forumServiceFactory } from "../../../Services/forumService"

export const OneComment = ({
    comment,
    user,
    _id,
    onDeletePostHandler,
}) => {

    const [liked, setLiked] = useState(false)
    const [likeCounter, setLikeCounter] = useState(0)
    const [likeUser, setLikeUser] = useState([])
console.log(likeCounter)
    // console.log("likeUser",likeUser)
    const commentId = _id
    // console.log("commentId",  _id,)
    const forumService = useService(forumServiceFactory)

    const { userId } = useAuthContext()


    useEffect(() => {
        forumService.getAllLikes(commentId)
            .then(result => {

                const forumLikes = result.filter(x => x.commentId === commentId)

                setLikeCounter(forumLikes.length);

                setLiked(forumLikes.some(like => like.userId === userId));
                setLikeUser(forumLikes.find(like => like.userId === userId));
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });

    }, [commentId, userId, likeCounter])

    const likeId = likeUser?._id
 
    const handleLikeToggle = async () => {
        if (liked) {

            await forumService.deleteLike(likeId);
            setLikeCounter(likeCounter - 1);

            setLiked(false)

        } else if (!liked) {
            const result = await forumService.createLike(userId, commentId)
            setLikeCounter(likeCounter + 1);

            setLiked(true)
        }



    }






    return (
        <>
            <div className="author-details">
                {/* {aко има коментари да се показва} */}

                <div className="p-component-comment"></div>
                <p>
                    <span style={{ color: "blue" }}>{user} </span>
                </p>
                <p> {comment}</p>
                <div className="like-component">
                   

                    <p>{likeCounter}</p>

                    <BiLike key={commentId} style={{ size: "60px,", color: "blue" }} ></BiLike>
                </div>

            </div>
            <div className="like-delete-section" style={{ fontSize: "2px" }}>
                <span className="like-delete-button" onClick={handleLikeToggle}>{liked ? "Unlike" : "Like"}</span>
                <span className="like-delete-button" onClick={() => onDeletePostHandler(commentId)}>Delete</span>
            </div>
        </>
    )
}