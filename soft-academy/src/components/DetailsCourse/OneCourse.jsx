import { Link, useParams } from "react-router-dom"
import { CommentsPopUp } from "../Comments/CommentsPopUp"
import { useState } from "react"
import { useCourseContext } from "../contexts/CourseContext"
import { ConfirmBox } from '../ConfirmBox/ConfirmBox'
import * as likeService from "../Services/likeService"
import { useAuthContext } from "../contexts/UserContext"
import { useEffect } from "react"
import { BiLike } from "react-icons/bi"


export const OneCourse = ({
    imageUrl,
    firstName,
    lastName,
    _id,
    email,
    description,
    price,
    ownerCourse,
    date,
    selectOption,
    courseName,
    comments,
    onCommentSubmit,
    _ownerId

}) => {


    const { userId, } = useAuthContext()

    const { courseId } = useParams()
    const [commentsPopUp, setCommentsPopUp] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likeCounter, setLikeCounter] = useState(0)
    const [likeUser, setLikeUser] = useState([])
    const { onDeleteClick, } = useCourseContext()


    useEffect(() => {
        likeService.getAllLikes(courseId)
            .then(response => {
                console.log("response", response)

                const likesCourse = (response.filter(like => like.courseId === courseId));
                console.log("likeCourse", likesCourse)
                setLikeCounter(likesCourse.length);
                setLiked(likesCourse.some(like => like.userId === userId));
                setLikeUser(likesCourse.find(like => like.userId === userId));
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
    }, [courseId, userId, likeCounter]);


    const isOwner = _ownerId === userId

    // console.log(likeUser)
    const likeId = likeUser?._id
    const openCommentsPopUp = () => {
        setCommentsPopUp(true)
    }
    const closeCommentsPopUp = () => {
        setCommentsPopUp(false)
    }
    const openDelete = () => {
        setIsOpen(true)
    }
    const onCloseDelete = () => {
        setIsOpen(false)
    }

    const handleLikeToggle = async () => {
        if (liked) {
            // Send a request to remove the like
            try {
                await likeService.deleteLike(likeId);
                setLikeCounter(likeCounter - 1);
                setLiked(false);
            } catch (error) {
                console.error('Error removing like:', error);
            }
        } else if (!liked) {
            // Send a request to add a like
            try {
                const result = await likeService.createLike(courseId, userId);
                console.log(result)
                setLikeCounter(likeCounter + 1);
                setLiked(true);

            } catch (error) {
                console.error('Error adding like:', error);
            }
        }
    };



    return (
        <>

            <div className="main_card">
                <div className="card_left">

                    <div className="card_details">

                        <h1>Course: {courseName}</h1>
                        <h3>Created by an author: {ownerCourse}</h3>
                        <h3>Email: {email}</h3>

                        <div className="card_animal">
                            <p className="card-location">Language: {selectOption}</p>
                            <p className="card-date">Start date: {date}</p>
                        </div>

                        <p className="disc">{description}</p>


                        <div className="social-btn">

                            {isOwner && (<>
                                <Link to={`/catalog/${_id}/edit`} className="edit-btn">Edit</Link>
                                <button onClick={() => openDelete()} className="del-btn">Delete</button>
                            </>
                            )}

                            <div>
                                <BiLike style={{ size: "60px,", color: "blue" }} />
                                <p> {likeCounter}</p>
                            </div>
                            <br />


                            <div className="divider"></div>
                            <div className="comments-action-buttons">

                                <button className="like-button" onClick={handleLikeToggle}>{liked ? "Unlike" : "Like"}</button>
                                <button className="comment-button" onClick={openCommentsPopUp} >Comments</button>
                            </div>


                            {/*                 
                        <p className="thanks-for-vote">Thanks For Voting</p>
        
                        <a href="/photos/{{photo._id}}/voteUp" className="vote-up">UpVote +1</a>
                        <a href="/photos/{{photo._id}}/voteDown" className="vote-down">DownVote -1</a> */}


                        </div>
                    </div>

                </div>
           

                <div className="card_right">
                    <img src={imageUrl} alt="image" />
                    <br />
                    <a href="https://npmtrends.com/" className="trend-btn">
                        <img className="trend-btn" src="https://seeklogo.com/images/N/npm-logo-01B8642EDD-seeklogo.com.png" alt="npm trends icon" />
                    </a>
                    <br />
                    <br />
                    <p className="card-keyword">Lector: <span>{firstName} {lastName}</span> </p>
                    {/* <p className="card-location">Location: </p> */}
                    <h2>Price: {price}$</h2>
                    {/* buttons */}


                </div>

            </div>
                 {/* Lector */}
                 <div>
                    <div className="lector-card">
                        <img className="lector-img" src="https://seeklogo.com/images/N/npm-logo-01B8642EDD-seeklogo.com.png" alt="lector-img" />
                        <h2>Course: <span>{firstName} {lastName}</span> </h2>
                        <p className="lector-disc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quaerat nihil eligendi suscipit ipsam maiores sint eos obcaecati enim minima iure tempora fugiat, amet modi voluptatibus exercitationem, deserunt, laboriosam ducimus!
</p>
                    </div>


                </div>

            <CommentsPopUp onCommentSubmit={onCommentSubmit} isOpenComments={commentsPopUp} onCloseComments={closeCommentsPopUp} comments={comments} />

            <ConfirmBox
                open={isOpen}
                closeDialog={() => onCloseDelete()}
                // title={deleteData?.name}
                deleteFunction={() => { setIsOpen(false), onDeleteClick(_id) }}
            />

        </>


    )
}