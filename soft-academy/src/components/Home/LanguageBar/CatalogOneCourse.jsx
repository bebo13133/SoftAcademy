import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import * as likeService from "../../Services/likeService"
import * as bookmarkService from "../../Services/bookmarkService"
import { useAuthContext } from "../../contexts/UserContext";
import '../../CatalogCourses/bookMark.css'


export const CatalogOneCourse=({
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
})=>{

    const [likes, setLikes] = useState([])

    const [isBookmarked, setBookmarked] = useState(false);
    const [bookMarkUser, setBookmarkUser] = useState([])
    const { userId } = useAuthContext()
    const courseId = _id

    const markId = bookMarkUser?._id


    useEffect(() => {
        likeService.getAllLikes()
            .then(result => {
                const likesCourse = (result.filter(like => like.courseId === courseId));
                setLikes(likesCourse)


            })


    }, [])


    const handleBookmarkToggle = async (courseId, userId, markId) => {
            if (isBookmarked) {

            const result = bookmarkService.deleteBookmark(markId);
            setBookmarked(false);
            setBookmarkUser(result)
        } else if (!isBookmarked) {

            const result = await bookmarkService.createBookmark(courseId, userId);
            setBookmarked(true);
            return setBookmarkUser(result)

        }
    }

    useEffect(() => {
        bookmarkService.getAllMarks(courseId)

            .then(response => {


                const bookMarkCourse = (response.filter(like => like.courseId === courseId));
           

                setBookmarked(bookMarkCourse.some(like => like.userId === userId));
                setBookmarkUser(bookMarkCourse.find(like => like._ownerId === userId));
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
    }, [setBookmarkUser]);
    // console.log("markId", markId)

    // console.log(`Bookmark`,bookMarkUser)

    // console.log("markId", markId)


return(
    <>
    <div className=" col-md-4 col-sm-6">
                <div className="single-explore-item">
                    <div className="single-explore-img">
                        <img src={imageUrl ? imageUrl : imageUrl2} alt="explore image" />
                        <div className="single-explore-img-info">

                            <div className="single-explore-image-icon-box">
                                <ul>

                                    <li>
                                        <div className={`single-explore-image-icon ${isBookmarked ? 'bookmarked' : ''}`} >
                                            <i className={`fa ${isBookmarked ? 'fa-heart' : 'fa-heart-o'}`} onClick={() => handleBookmarkToggle(courseId, userId, markId)} style={{ color: isBookmarked ? 'red' : 'blue', background: "none", fontSize: "32px", marginLeft: "-40px" }}></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="single-explore-txt bg-theme-1">
                        <h2><a href="#">{courseName}</a></h2>
                        <p className="explore-rating-price">

                            <a href="#"> {Math.floor(Math.random() * 10 + likes.length + 1) + likes.length} Likes</a>
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