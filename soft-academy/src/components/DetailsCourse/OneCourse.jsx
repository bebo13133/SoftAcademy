import { Link, useParams } from "react-router-dom"
import { CommentsPopUp } from "../Comments/CommentsPopUp"
import { useState } from "react"
import { useCourseContext } from "../contexts/CourseContext"
import { ConfirmBox } from '../ConfirmBox/ConfirmBox'
import * as likeService from "../Services/likeService"
import { useAuthContext } from "../contexts/UserContext"
import { useEffect } from "react"
import { BiLike } from "react-icons/bi"
import { useService } from "../Hooks/useService"
import { courseServiceFactory } from "../Services/courseService"
import * as commentsService from "../Services/commentsService"


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

    _ownerId,
    imageUrl2

}) => {


    const [oneCourse, setOneCourse] = useState([])
    const [commentsPopUp, setCommentsPopUp] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [liked, setLiked] = useState(false)
    const [oneComment, setOneComment] = useState([])
    const [showMore, setShowMore] = useState(false);

    const [likeCounter, setLikeCounter] = useState(0)
    const [likeUser, setLikeUser] = useState([])
    const { onDeleteClick, } = useCourseContext()
    const courseService = useService(courseServiceFactory)
    const { userId, } = useAuthContext()

    const { courseId } = useParams()
    const toggleShowMore = () => {
        setShowMore((prev) => !prev);
    };
    const firstDescriptions = description?.slice(0, 320)


    const fetchData = async () => {
        try {
            const result = await courseService.getOne(courseId);
            setOneCourse(result);
            const commentResult = await commentsService.getAllComments(courseId)

            setOneComment(commentResult);

        } catch (error) {
            throw new Error("Error fetching forum post");
        }
    }

    const onDeletePostHandler = (commentId) => {

        commentsService.deleteComment(commentId)
        setOneComment(state => state.filter(comment => comment._id !== commentId))
    };

    const onCommentSubmit = async (values) => {

        try {
            const result = await commentsService.createComment(
                courseId,
                values.comment,
                values.user
            )



            setOneComment(state => [...state, { comment: result.comment, user: result.user }]) //TODO ДА СЕ ДОБАВИ USERNAME, КАТО ВТОРИ ПАРАМЕТЪР

            await fetchData()

        } catch (err) {
            console.error('Error:', err);


        }

    };

    useEffect(() => {
        fetchData()
        likeService.getAllLikes(courseId)
            .then(response => {
                // console.log("response", response)

                const likesCourse = (response.filter(like => like.courseId === courseId));

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
    const onBackHandler = () => {
        navigate('/forum')
    }


    const openCommentsPopUp = () => {
        setCommentsPopUp(true)
    }
    const closeCommentsPopUp = () => {
        setCommentsPopUp(false)
    }
    const openDelete = () => {
        setIsOpen(true)
        onDeleteClick()
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
                // console.log(result)
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

                        <p className="disc toggle-desc">{showMore ? description : firstDescriptions}...</p>
                        {!showMore && <button className="show-more-button-details" onClick={toggleShowMore}>Read More</button>}
                        {showMore && <button className="show-more-button-details" onClick={toggleShowMore}>Read Less</button>}

                        <div className="social-btn">

                            {isOwner && (<>
                                <Link to={`/catalog/${_id}/edit`} data-testid="edit-link" className="edit-btn">Edit</Link>
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


                        </div>
                    </div>

                </div>


                <div className="card_right">
                    <img src={imageUrl ? imageUrl : imageUrl2} alt="images" />
                    <br />
                    <div className="footer-social social-details ">
                        <Link to="https://www.facebook.com/groups/706263354783010" target="_blank" ><i className="fa fa-facebook" ></i></Link>
                        <Link to="https://twitter.com/SoftAcademyy" target="_blank"><i className="fa fa-twitter" ></i></Link>
                        <Link to="https://www.instagram.com/softacademy85/" target="_blank"><i className="fa fa-instagram" ></i></Link>
                    </div>
                    <br />
                    <br />
                    <p className="card-keyword">Lector: <span>{firstName} {lastName}</span> </p>
                    {/* <p className="card-location">Location: </p> */}
                    <h2>Price: {price}$</h2>
                    {/* buttons */}


                </div>

            </div>
            {/* Lector */}


            <CommentsPopUp
                key={courseId} // за да отразява правилно промяната 
                onCommentSubmit={onCommentSubmit}
                {...oneCourse}
                isOpenComments={commentsPopUp}
                onCloseComments={closeCommentsPopUp}
                oneComment={oneComment}
                liked={liked}
                likeCounter={likeCounter}
                handleLikeToggle={handleLikeToggle}

                onDeletePostHandler={onDeletePostHandler}

            />


            <ConfirmBox open={isOpen} closeDialog={() => onCloseDelete()}                // title={deleteData?.name}
                deleteFunction={() => { setIsOpen(false), onDeleteClick(_id) }}
            />

        </>


    )
}