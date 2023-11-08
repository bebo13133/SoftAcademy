import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as bookmarkService from "../Services/bookmarkService"

export const HomeOneCourse = ({
    imageUrl,
    imageUrl2,
    description,
    courseName,
    _id,
}) => {
    const { isAuthentication } = useAuthContext()
    const navigate = useNavigate()

    const [isBookmarked, setBookmarked] = useState(false);
    const [bookMarkUser, setBookmarkUser] = useState([])
    const { userId } = useAuthContext()
    const courseId = _id

    const markId = bookMarkUser?._id

    const handleClick = () => {
        return isAuthentication ? navigate(`/catalog/${_id}`) : alert('Please log in to access the details.')
    }


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
                console.log("bookMarkCourse", bookMarkCourse)

                setBookmarked(bookMarkCourse.some(like => like.userId === userId));
                setBookmarkUser(bookMarkCourse.find(like => like._ownerId === userId));
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
    }, [setBookmarkUser]);












    return (
        <>
            <div className="col-md-4 col-sm-6 " >
                <div className="single-how-works">
                    <div className="single-how-works-icon">
                        <img className="home-top-lang" src={imageUrl ? imageUrl : imageUrl2}
                        // alt={"imageUrl ? imageUrl : imageUrl2"} 
                        />
                    </div>
                    <div className="single-explore-image-icon-box">
                        <ul>
                            <li>
                                <div className={`single-explore-image-icon ${isBookmarked ? 'bookmarked' : ''}`} >
                                    <i className={`fa ${isBookmarked ? 'fa-heart' : 'fa-heart-o'}`} onClick={() => handleBookmarkToggle(courseId, userId, markId)} style={{ color: isBookmarked ? 'red' : 'blue', background: "none", fontSize: "32px", marginLeft: "-40px" }}></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <h2><Link to={`/catalog`}>Learn <span>{courseName}</span> language</Link></h2>
                    <p>
                        {description && description.slice(0, 150)}
                    </p>
                    <button className="welcome-hero-btn how-work-btn" onClick={handleClick}>
                        read more
                    </button>
                </div>
            </div>

        </>
    )
}