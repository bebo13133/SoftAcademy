import { useForm } from '../../../Hooks/useForm';
import './commentsForum.css'


export const CommentsForum = ({
    onCloseComments,
    isOpenComments,
    imageUrl,
    title,
    onPostSubmit
}) => {

const{onSubmit,onChangeHandler,values}=useForm({
comment:"",
},onPostSubmit)



    if (!isOpenComments) {
        return null; // Ако isOpenComments е false, не показвай компонента
      }
    
    const handleClickOutside = (e) => {                    //При натискане извън полето да се затвори 
        if (e.target.className === "popup-form") {
            onCloseComments()
        }
    }


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
                    <p className="comment-count">Comments:
                        {/* {commentCount} */}
                    </p>

                    <div className="author-section">
                        <div className="author-details">
                            {/* {aко има коментари да се показва} */}
                            <p>Author:
                                {/* {author} */}
                            </p>
                            <p>
                                {/* {content} */}
                            </p>
                        </div>

                        <div className="like-delete-section">
                            <span className="like-delete-button">Like</span>
                            <span className="like-delete-button">Delete</span>
                        </div>
                    </div>
                </div>
                <form className="comment-section" onSubmit={onSubmit}>
                    <textarea
                        placeholder="Въведете коментар..."
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