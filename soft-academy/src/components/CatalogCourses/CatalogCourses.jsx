import { useContext, useState, useEffect } from "react"
import './bookMark.css'
import { Bounce, Fade,Flip,Hinge,JackInTheBox,Roll,Rotate,Slide, Zoom  } from "react-awesome-reveal";

import { CourseContext, useCourseContext } from "../contexts/CourseContext"
import { IsLoading } from "../IsLoading/IsLoading"
import { OneCourse } from "./OneCourse"
import Footer from "../Footer/Footer"

const CatalogCourses = () => {

    const { courses } = useContext(CourseContext)
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [usersInfo, setUsers] = useState([])
    const resultsPerPage = 3;

    const indexOfLastResult = currentPage * resultsPerPage;   //първа страница почва от едно по номера на резултатите които искаме да се показват 
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = usersInfo.slice(indexOfFirstResult, indexOfLastResult);

    const totalPages = Math.ceil(usersInfo.length / resultsPerPage);
    useEffect(() => {
      
        setUsers(courses)
        setIsLoading(false)

    }, [courses])

    return (
        <>
            {isLoading ? <IsLoading /> : (<> <Fade delay="10" duration="2000" triggerOnce='true'><section id="explore" className="explore">
    

                <div className="container">
                    <div className="section-header">
                        <h2>Courses</h2>
                        <p>Explore New place, food, culture around the world and many more</p>
                    </div>

                    <div className="explore-content">

                        <div className="row">



                            {currentResults.length > 0 ? currentResults.map(course => <OneCourse key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}


                        </div>
                        <ul className="pagination-catalog" style={{marginTop:"0px"}}>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} onClick={() => setCurrentPage(index + 1)}  className={currentPage === index + 1 ? "active" : ""}>
                                    {index + 1}
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>
                <ul>
                    <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                </ul>
                <Footer />
              

            </section>  </Fade></>
            
            )}

        </>
    )
}
export default CatalogCourses