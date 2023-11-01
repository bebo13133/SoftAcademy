import { Link } from "react-router-dom"
import { CommentsPopUp } from "../Comments/CommentsPopUp"
import { useState } from "react"
import { IsOwnerCourse } from "../common/isOwnerCourse"
import { RouteGuard } from "../common/RouteGuard"
import { useCourseContext } from "../contexts/CourseContext"
import { ConfirmBox } from '../ConfirmBox/ConfirmBox'
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

}) => {

    const [commentsPopUp, setCommentsPopUp] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [liked,setLiked]=useState(false)
    const [likeCounter,setLikeCounter]= useState(0)

    const { onDeleteClick, } = useCourseContext()
    
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

    const handleLikeToggle=()=>{
        if(liked){
            setLikeCounter(likeCounter-1)
        }else{
            setLikeCounter(likeCounter+1)
        }
        setLiked(!liked)
    }

    return (
        <>

            <div className="main_card">
                <div className="card_left">

                    <div className="card_datails">

                        <h1>Course: {courseName}</h1>
                        <h3>Created by an author: {ownerCourse}</h3>
                        <h3>Email: {email}</h3>

                        <div className="card_animal">
                            <p className="card-location">Language: {selectOption}</p>
                            <p className="card-date">Start date: {date}</p>
                        </div>

                        <p className="disc">{description}</p>


                        <div className="social-btn">

                            <IsOwnerCourse>
                                <Link to={`/catalog/${_id}/edit`} className="edit-btn">Edit</Link>
                                <button onClick={() => openDelete()} className="del-btn">Delete</button>
                            </IsOwnerCourse>
                            <p>Likes: {likeCounter}</p>
                            <div className="divider"></div>
                            <div className="comments-action-buttons">

                                <button className="like-button" onClick={handleLikeToggle}>{liked ? "Unlike":"Like"}</button>
                                <button className="comment-button" onClick={openCommentsPopUp} >Comments</button>
                            </div>


                            {/*                 
                        <p className="thanks-for-vote">Thanks For Voting</p>
        
                        <a href="/photos/{{photo._id}}/voteUp" className="vote-up">UpVote +1</a>
                        <a href="/photos/{{photo._id}}/voteDown" className="vote-down">DownVote -1</a> */}


                        </div>
                    </div>

                </div>
                {/* src="../DetailsCourse/img/npm_trends_logo.png"  */}
                <div className="card_right">
                    <img src={imageUrl} alt="image" />
                    <br/>
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
            <CommentsPopUp onCommentSubmit={onCommentSubmit} isOpenComments={commentsPopUp} onCloseComments={closeCommentsPopUp} comments={comments} />

            <ConfirmBox
                open={isOpen}
                closeDialog={()=>onCloseDelete()}
                // title={deleteData?.name}
                deleteFunction={() => {setIsOpen(false),onDeleteClick(_id)}}
            />

        </>


    )
}