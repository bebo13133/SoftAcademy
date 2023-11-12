import './commentsForum.css'


export const CommentsForum = () => {
    return (

        <>
            <div className="article-section">
                <img className="article-image" src={imageUrl} alt={title} />
                <h2 className="article-title">{title}</h2>
                <button className="like-button">Like</button>
                <p className="comment-count">Comments: {commentCount}</p>

                <div className="author-section">
                    <div className="author-details">
                        <p>Author: {author}</p>
                        <p>{content}</p>
                    </div>

                    <div className="like-delete-section">
                        <span className="like-delete-button">Like</span>
                        <span className="like-delete-button">Delete</span>
                    </div>
                </div>
            </div>
            <form className="comment-section">
                <textarea
                    placeholder="Въведете коментар..."
                    value={comment}
                    onChange={handleCommentChange}
                ></textarea>
                <button className="send-button" type="submit" onClick={handleSendClick}>
                    Send
                </button>
            </form>


        </>

    )


}