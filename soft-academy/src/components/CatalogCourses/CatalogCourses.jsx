import { useContext, useState, useEffect } from "react"
import './bookMark.css'
import { Bounce, Fade, Flip, Hinge, JackInTheBox, Roll, Rotate, Slide, Zoom } from "react-awesome-reveal";

import { CourseContext, useCourseContext } from "../contexts/CourseContext"
import { IsLoading } from "../IsLoading/IsLoading"
import { OneCourse } from "./OneCourse"
import Footer from "../Footer/Footer"

import { usePaginations } from "../Hooks/usePaginations";
import { Pagination } from "../Pagination/Pagination";
import { useLocation } from "react-router-dom";

const CatalogCourses = () => {
 

    const { courses } = useContext(CourseContext)
    const [isLoading, setIsLoading] = useState(true)

    const [coursesInfo, setCoursesInfo] = useState([])
    const resultsPerPage = 3;


    const { getPaginationData } = usePaginations(resultsPerPage)

    const {totalPages,currentPage,currentResult,paginate,setCurrentPage}= getPaginationData(coursesInfo)

    // const handleBack = () => {
    //     if (currentPage > 1) {
    //         paginate(currentPage - 1);
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    useEffect(() => {

        setCoursesInfo(courses)
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



                            {currentResult.length > 0 ? currentResult.map(course => <OneCourse key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}


                        </div>
                        <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

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