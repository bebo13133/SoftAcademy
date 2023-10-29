import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { courseServiceFactory } from "../Services/courseService"


export const DetailsCourse = () => {
const [details,setDetails] = useState([])

const {courseId} = useParams()
const courseService=courseServiceFactory()
useEffect(()=>{
    courseServiceFactory

})

    return (
        <section id="course-details">
            <h1>Course Details</h1>
            <div className="course-info-section">

                <div className="course-header">
                    <img className="course-img" src="https://cdn3d.iconscout.com/3d/premium/thumb/javascript-7308311-5938360.png" alt="" />
                    <h1>title</h1>
                    <span className="course-price">Max Level: </span>
                    <p className="course-type">Ctaegory</p>
                </div>

                <p className="course-text">summary</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                {/* <div className="course-details-comments">
               
                    <h2>Comments:</h2>
                    <ul >
                        {allComments.map(c =>
                            <li key={c._id} className="comment">
                                <p>{c.comment}</p>
                            </li>
                        )}
                    </ul>
                    {allComments.length === 0 && <p className="no-comment">No comments.</p>}

            

                </div> */}
                {<div className="course-details-buttons">
                    {/* <Link to={`/catalog/${_id}/edit`} className="button">Edit</Link> */}
                    <button onClick={() => onDeleteClick(_id)} className="course-details-button">Delete</button>
                </div>}

            </div>

        </section>
    )
}