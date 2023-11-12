export const OneComment = ({
    comment,
    user,
    onDeletePostHandler,
    _id
   
}) => {
console.log(_id)


const commentId = _id
    return (
        <>
            <div className="author-details">
                {/* {aко има коментари да се показва} */}
                <p>
                    <span style={{ color: "blue" }}>{user}</span>
                </p>
                <p>
                    {comment}
                </p>
            </div>
            <div className="like-delete-section" style={{ fontSize: "2px" }}>
                <span className="like-delete-button">Like</span>
                <span className="like-delete-button" onClick={()=>onDeletePostHandler(commentId)}>Delete</span>
            </div>
        </>
    )
}