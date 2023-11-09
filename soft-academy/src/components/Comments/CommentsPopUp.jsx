
import { useEffect, useState } from 'react';
import { useForm } from '../Hooks/useForm';
import { RouteGuard } from '../common/RouteGuard';


export const CommentsPopUp = ({
    isOpenComments,
    onCloseComments,
    comments,
    onCommentSubmit
}) => {
    const [showAll, setShowAll] = useState(false);


    // За формата , важното да е на първо място 
    const { values, onChangeHandler, onSubmit } = useForm({
        comment: "",
    }, onCommentSubmit)


    // Да се виждат само първите 5 коментара 
    const initialComments = showAll ? comments : comments.slice(0, 5);
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    // ако няма събитие няма да го отвори полето 
    if (!isOpenComments) return null;



    // Да се затваря когато се натисне извън полето
    const handleClickOutside = (e) => {
        if (e.target.className === "comments-popup") {
            onCloseComments()
        }
    }

    
    return (
        <div className="comments-popup" onClick={handleClickOutside}>

            <div className="comments-content">
                <button className="close-button" onClick={onCloseComments}>Close</button>
                <h2>Comments:</h2>
                <div className="divider"></div>
                <div className="comments-scroll"></div>
                <ul>
                    {initialComments.map((comment, index) => (
                        <li key={index}>user:  {comment.comment}</li>
                    ))}
                </ul>
                <div />
                {comments.length > 5 && (
                    <button onClick={toggleShowAll}>
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                )}
              
            </div>
            <div className="popup-form"></div>
            <RouteGuard>
                    <article className="create-comment">
                        <label>Add new comment:</label>
                        <form className="form-comment" onSubmit={onSubmit}>
                            <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={onChangeHandler}></textarea>
                            <input className="btn-comment submit" type="submit" value="Add Comment" />
                        </form>
                    </article>
                </RouteGuard>

        </div>
    );


}