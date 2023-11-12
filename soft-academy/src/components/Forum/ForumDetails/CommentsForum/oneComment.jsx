
import { useState } from "react"
import { BiLike } from "react-icons/bi"


export const OneComment = ({
    comment,
    user,
    onDeletePostHandler,
    _id

}) => {

    const [liked, setLiked] = useState(false)

    const handleLikeToggle = () => {
        if (liked) {
            setLiked(false)
        } else if (!liked) {
            setLiked(!liked)
        }



    }





    const commentId = _id
    return (
        <>
            <div className="author-details">
                {/* {aко има коментари да се показва} */}
                <p>
                    <span style={{ color: "blue" }}>{user} </span>

                </p>
                <p>
                    {comment}
                    <br />
                    <div className="like-component">
                        <p> 1</p>
                        <BiLike style={{ size: "60px,", color: "black" }} />
                    </div>
                </p>

            </div>
            <div className="like-delete-section" style={{ fontSize: "2px" }}>
                <span className="like-delete-button" onClick={handleLikeToggle}>{liked ? "Unlike" : "Like"}</span>
                <span className="like-delete-button" onClick={() => onDeletePostHandler(commentId)}>Delete</span>
            </div>
        </>
    )
}