import { useForm } from '../../../Hooks/useForm';
import './commentsForum.css'
import { OneComment } from './oneComment';
import { useState } from 'react';
import { useAuthContext } from '../../../contexts/UserContext';
export const CommentsForum = ({
    onCloseComments,
    isOpenComments,
    imageUrl,
    title,
    onPostSubmit,
    comments,
}) => {
    const [showAll, setShowAll] = useState(false);
    const {userEmail } = useAuthContext()

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

    const initialComments = showAll ? comments : comments.slice(0, 10);
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
                    <button className="like-button">Like</button>
                    <p className="comment-count">Comments: {comments.length } </p>

                    <div className="author-section">
                        {initialComments && initialComments.map((comment, index) => <OneComment key={index + 1} {...comment} />)}
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