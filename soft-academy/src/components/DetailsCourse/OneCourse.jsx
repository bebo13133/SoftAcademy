import { Link } from "react-router-dom"
import { CommentsPopUp } from "../Comments/CommentsPopUp"
import { useState } from "react"

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
    onCommentSubmit

}) => {
    console.log(comments)
    const [commentsPopUp, setCommentsPopUp] = useState(false)

    const openCommentsPopUp = () => {
        setCommentsPopUp(true)
    }
    const closeCommentsPopUp = () => {
        setCommentsPopUp(false)
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

                            <a href="/photos/{{photo._id}}/edit" className="edit-btn">Edit</a>
                            <a href="/photos/{{photo._id}}/delete" className="del-btn">Delete</a>
                            <div className="divider"></div>
                            <div className="comments-action-buttons">
                                <button className="like-button">Like</button>
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
                    <a href="https://npmtrends.com/" className="trend-btn">
                        <img className="trend-btn" src="https://seeklogo.com/images/N/npm-logo-01B8642EDD-seeklogo.com.png" alt="npm trends icon" />Trends
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
        </>


    )
}