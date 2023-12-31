import { useContext, useState, useEffect } from "react"

import './bookMark.css'
import { Fade } from "react-awesome-reveal";

import { CourseContext, useCourseContext } from "../contexts/CourseContext"
import { IsLoading } from "../IsLoading/IsLoading"
import { OneCourse } from "./OneCourse"
import Footer from "../Footer/Footer"

import { usePaginations } from "../Hooks/usePaginations";
import { Pagination } from "../Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "../AdminDashboard/AdminSideBar";

const CatalogCourses = () => {


    const { courses } = useContext(CourseContext)
    const [isLoading, setIsLoading] = useState(true)

    const [coursesInfo, setCoursesInfo] = useState([])
    const resultsPerPage = 3;


    const { getPaginationData } = usePaginations(resultsPerPage)

    const { totalPages, currentPage, currentResult, paginate, setCurrentPage } = getPaginationData(coursesInfo)

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

           
                <Fade delay="10" duration="2000" triggerOnce='true'><section id="explore" className="explore">


                    <div className="container">
                        <div className="image-section-catalog">
                            {/* Добавете снимката тук */}
                            <img src="/img/sideImage.webp" alt="Course Catalog Image" />
                        </div>
                        <div className="section-header">
                            <h2 style={{ color: "rgb(0 156 233)" }}>Your Gateway to Diverse Courses</h2>
                            <p style={{ color: "white", textShadow: "rgb(15 38 89 / 44%) 2px 2px 0px" }}>Discover a comprehensive catalog of courses covering a myriad of subjects.
                                From technology and business to arts and sciences, explore courses curated to enhance your skills and knowledge. Your educational journey starts here explore, learn, and excel with our diverse course catalog.</p>
                        </div>
                        {isLoading ? <IsLoading /> : (<>
                        <div className="explore-content">

                            <div className="row">



                                {currentResult.length > 0 ? currentResult.map(course => <OneCourse key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}


                            </div>
                            <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                        </div>
                        </>)}
                    </div>
                    {currentResult.length > 0 && (<ul>
                        <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                    </ul>)}
                    {currentResult.length > 0 && <Footer />}


                </section>  </Fade>
     

        </>
    )
}
export default CatalogCourses