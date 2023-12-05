
import { useState } from 'react';
import { useForm } from '../Hooks/useForm';

import { useAuthContext } from '../contexts/UserContext';
import { BiLike } from "react-icons/bi"
import { CourseOneComponent } from './CourseOneComment';
import './courseComments.css'
import { v4 } from 'uuid';

export const CommentsPopUp = ({
    isOpenComments,
    onCloseComments,
    handleLikeToggle,
    onDeletePostHandler,
    liked,
    likeCounter,
    oneComment,
    onCommentSubmit,
    imageUrl,
    title,
    author,
    _id,
}) => {

    const [showAll, setShowAll] = useState(false);
    const { userEmail } = useAuthContext()

    // За формата , важното да е на първо място 
    const { values, onChangeHandler, onSubmit } = useForm({
        comment: "",
        user: userEmail,
    }, onCommentSubmit)


    // Да се виждат само първите 6 коментара 
    const initialComments = showAll ? oneComment : oneComment.slice(0, 6);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };
    // ако няма събитие няма да го отвори полето 
    if (!isOpenComments) return null;



    // Да се затваря когато се натисне извън полето
    const handleClickOutside = (e) => {
        if (e.target.className === "popup-form-course") {
            onCloseComments()
        }
    }


    return (
        <section className="popup-form-course" onClick={handleClickOutside}>
            <div className="close-button-forum" onClick={onCloseComments}>
                X
            </div>
            <div className="article-section">
            {/* <ul>
                <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a",  }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
            </ul> */}
                <img className="article-image-course" src={"/img/courseComments.webp"} alt={title} />
                <h2 className="article-title">{title}</h2>
                <h3><span style={{ color: "red" }}>{author}</span></h3>

                <div className="like-component1">
                    <button className="like-button" onClick={handleLikeToggle}>{liked ? "Unlike" : "Like"}</button>
                    <div className="like-button2">
                        <p>
                            {likeCounter}
                        </p>
                        <BiLike className="svg-like" key={_id} style={{ size: "60px,", color: "blue" }} ></BiLike>
                    </div>
                </div>
                <p className="comment-count">Comments: {oneComment.length} </p>

                <div className="author-section-course">
                    {initialComments && initialComments.map((comment) => <CourseOneComponent key={comment._id || v4()} {...comment}
                        onDeletePostHandler={onDeletePostHandler}
                    />)}
                    {oneComment.length > 5 && (
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
    );

}


