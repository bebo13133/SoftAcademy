import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import * as likeService from "../Services/likeService"


export const OneAddedCourse = ({
    imageUrl,
    description,
    price,
    courseName,
    imageUrl2,
    date,
    firstName,
    lastName,
    _id,
    lectorImage
}) => {
    const [likes, setLikes]=useState([])
    // const { courseId } = useParams()
    const courseId = _id

useEffect(() => {
    likeService.getAllLikes()
    .then(result=>{
    const likesCourse = (result.filter(like => like.courseId === courseId));
      setLikes(likesCourse)

        
    })
        

},[])
    return (
        <>
            <div className=" col-md-4 col-sm-6">
                <div className="single-explore-item">
                    <div className="single-explore-img">
                        <img src={imageUrl ? imageUrl : imageUrl2} alt="explore image" />
                        <div className="single-explore-img-info">
                            {/* <button onClick="window.location.href='#'">best rated</button> */}
                            <div className="single-explore-image-icon-box">
                                <ul>
                                    <li>
                                        <div className="single-explore-image-icon">
                                            <i className="fa fa-arrows-alt"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-explore-image-icon">
                                            <i className="fa fa-bookmark-o"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="single-explore-txt bg-theme-1">
                        <h2><a href="#">{courseName}</a></h2>
                        <p className="explore-rating-price">

                            <a href="#"> {Math.floor(Math.random() * 5) + likes.length} Likes</a>
                            <span className="explore-price-box">
                                Price &ensp;
                                <span className="explore-price">{price}$</span>
                            </span>
                            <a href="#">Start date : {date}</a>
                        </p>
                        <div className="explore-person">
                            <div className="row">
                                <h2>Lector name:</h2>
                                <div className="col-sm-2">
                                    <div className="explore-person-img">
                                        <a href="#">
                                            <img src={lectorImage} alt="explore person" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-10">
                                    <p>{firstName} {lastName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="explore-open-close-part">
                            <div className="row">
                                <div className="col-sm-5">
                                    <Link to={`/catalog/${_id}`}><button className="close-btn" >Read more...</button></Link>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}