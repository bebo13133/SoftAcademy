import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
export const HomeOneCourse = ({
    imageUrl,
    imageUrl2,
    description,
courseName,
_id,
}) => {
            const {isAuthentication} =useAuthContext()
            const navigate=useNavigate()
            const handleClick = () => {
               return isAuthentication ? navigate(`/catalog/${_id}`) : alert('Please log in to access the details.')
            }
    return (
        <>
            <div className="col-md-4 col-sm-6 " >
                <div className="single-how-works">
                    <div className="single-how-works-icon">
                    <img className="home-top-lang" src={imageUrl ? imageUrl : imageUrl2} 
                    // alt={"imageUrl ? imageUrl : imageUrl2"} 
                    />
                    </div>
                    <h2><Link to={`/catalog`}>Learn <span>{courseName}</span> language</Link></h2>
                    <p>
                        {description && description.slice(0,150)}
                    </p>
                     <button className="welcome-hero-btn how-work-btn" onClick={handleClick}>
									read more
					</button> 
                </div>
            </div>

        </>
    )
}