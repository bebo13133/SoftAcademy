
import { useEffect, useState } from "react"
import { BiLike } from "react-icons/bi"
// import { useService } from "../../../Hooks/useService"
// import { forumServiceFactory } from "../../../Services/forumService"
import { useAuthContext } from "../contexts/UserContext"

export const CourseOneComponent =({
    comment,
    user,
    _id,
    onDeletePostHandler,
    _ownerId
})=>{
    const [liked, setLiked] = useState(false)
    const [likeCounter, setLikeCounter] = useState(0)
    const [likeUser, setLikeUser] = useState([])



    // console.log("likeUser",likeUser)
    const commentId = _id

    // const forumService = useService(forumServiceFactory)

    const { userId } = useAuthContext()

    const isOwner = _ownerId === userId


    // useEffect(() => {
    //     forumService.getAllLikes(commentId)
    //         .then(result => {

    //             const forumLikes = result.filter(x => x.commentId === commentId)

    //             setLikeCounter(forumLikes.length);

    //             setLiked(forumLikes.some(like => like.userId === userId));
    //             setLikeUser(forumLikes.find(like => like.userId === userId));
    //         })
    //         .catch(error => {
    //             console.error('Error fetching likes:', error);
    //         });

    // }, [commentId, userId, likeCounter])

    // const likeId = likeUser?._id


    // const handleLikeToggle = async () => {
    //     if (liked) {
    //         try {
    //             await forumService.deleteLike(likeId);
    //             setLikeCounter(likeCounter - 1);

    //             setLiked(false)

    //         } catch (err) {
    //             console.error('Error removing like:', err);

    //         }

    //     } else if (!liked) {
    //         try {

    //             const result = await forumService.createLike(userId, commentId)
    //             setLikeCounter(likeCounter + 1);

    //             setLiked(true)
    //         } catch (error) {
    //             console.error('Error adding like:', error);
    //         }
    //     }
    // }

    return(
        <>
         <div className="author-details">
                {/* {aко има коментари да се показва} */}

                <div className="p-component-comment"></div>
                <p>
                    <span style={{ color: "blue" }}>{user} </span>
                </p>
                <p> {comment}</p>
                <div className="like-component">


                    <p>{"likeCounter"}</p>

                    <BiLike key={commentId} style={{ size: "60px,", color: "blue" }} ></BiLike>
                </div>

            </div>
            <div className="like-delete-section" style={{ fontSize: "2px" }}>
                <span className="like-delete-button" onClick={"handleLikeToggle"}>{liked ? "Unlike" : "Like"}</span>
                {isOwner && <span className="like-delete-button" onClick={() => onDeletePostHandler(commentId)}>Delete</span>}
            </div>
        </>
    )
}