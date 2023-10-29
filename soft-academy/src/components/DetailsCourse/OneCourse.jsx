import { Link } from "react-router-dom"

export const OneCourse = ({
    imageUrl,
    firstName,
    lastName,
    _id,
    email,
    description,
    price,
    username,
    date,
    selectOption,
    courseName

}) => {

    return (
        <>
            <div className="main_card">
                <div className="card_left">
                    <div className="card_datails">

                        <h1>Title: {courseName}</h1>
                        <h3>Created by an author: {username}</h3>
                        <div className="card_animal">
                            <p className="card-keyword">Keyword: </p>
                            <p className="card-location">Location: </p>
                            <p className="card-date">Date: {date}</p>
                        </div>

                        <p className="disc">{description}</p>


                        <div className="social-btn">

                            <a href="/photos/{{photo._id}}/edit" className="edit-btn">Edit</a>
                            <a href="/photos/{{photo._id}}/delete" className="del-btn">Delete</a>
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
                    <a href="https://npmtrends.com/" className="trend-btn">   Trends
                        <img className="trend-btn"src="https://seeklogo.com/images/N/npm-logo-01B8642EDD-seeklogo.com.png" alt="npm trends icon" />
                     
                </a>
                </div>
          
            </div>

        </>


    )
}