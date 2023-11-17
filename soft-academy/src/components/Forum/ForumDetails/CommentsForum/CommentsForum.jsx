import { useForm } from '../../../Hooks/useForm';
import './commentsForum.css'
import { OneComment } from './oneComment';
import { useState } from 'react';
import { useAuthContext } from '../../../contexts/UserContext';
import { BiLike } from "react-icons/bi"

export const CommentsForum = ({
    onCloseComments,
    isOpenComments,
    imageUrl,
    title,
    onPostSubmit,
    comments,
    onDeletePostHandler,
    author,
    _id,
    handleLikeToggle,
    liked,
    likeCounter
 
}) => {
    const [showAll, setShowAll] = useState(false);
    const {userEmail,userId } = useAuthContext()
   

    const { onSubmit, onChangeHandler, values } = useForm({
        comment: "",
        user:userEmail
    }, onPostSubmit)


    if (!isOpenComments) {
        return null; // Ако isOpenComments е false, не показвай компонента
    }

    const handleClickOutside = (e) => {                    //При натискане извън полето да се затвори 
        if (e.target.className === "popup-form") {
            onCloseComments()
        }
    }

    const initialComments = showAll ? comments : comments.slice(0, 6);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };



    return (

        <>
            <section className="popup-form" onClick={handleClickOutside}>
                <div className="close-button-forum" onClick={onCloseComments}>
                    X
                </div>
                <div className="article-section">
                    <img className="article-image" src={imageUrl} alt={title} />
                    <h2 className="article-title">{title}</h2>
                    <h3><span style={{color:"red"}}>{author}</span></h3>
                    
                    <div className="like-component1">
                    <button className="like-button" onClick={handleLikeToggle}>{liked ? "Unlike" : "Like"}</button>
                  <div className="like-button2">     
                           <p>
                           {likeCounter}
                        </p>
                    <BiLike className="svg-like" key={_id} style={{ size: "60px,", color: "blue" }} ></BiLike>
                    </div> 
                    </div>
                    <p className="comment-count">Comments: {comments.length } </p>

                    <div className="author-section">
                        {initialComments && initialComments.map((comment) => <OneComment key={comment._id} {...comment} onDeletePostHandler={onDeletePostHandler} />)}
                        {comments.length > 5 && (
                            <button className="show-btn" onClick={toggleShowAll}>
                                {showAll ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                </div>
                <form className="comment-section" onSubmit={onSubmit}>
                    <textarea
                        placeholder="Comment..."
                        name="comment"
                        value={values.comment}
                        onChange={onChangeHandler}
                    ></textarea>
                    <button className="send-button" type="submit"
                        // onClick={handleSendClick}
                        value="add comment"
                    >
                        Send
                    </button>
                </form>
            </section>

        </>

    )


}