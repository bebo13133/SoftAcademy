
import { useContext, useState, useEffect } from "react"
import { CourseContext, useCourseContext } from "../../contexts/CourseContext"

import Footer from "../../Footer/Footer"
import { CatalogOneCourse } from "./CatalogOneCourse"
import { usePaginations } from "../../Hooks/usePaginations"


export const LanguageCatalog=()=>{
const [courses,setCourses] = useState([])
    const { languages } = useCourseContext()
  
 const resultPerPage = 3

 const {getPaginationData}=usePaginations(resultPerPage)
const {totalPages,currentResult,currentPage,paginate}=getPaginationData(courses)

    useEffect(() => {

        languages && setCourses(languages)

    }, [languages])
 


    
    return (
        <>
          

            <section id="explore" className="explore">
                <div className="container">
                    <div className="section-header">
                        <h2>Courses</h2>
                        <p>Explore New place, food, culture around the world and many more</p>
                    </div>
                    <div className="explore-content">
                        <div className="row">


                            {currentResult.length > 0 ?  currentResult.map(course => <CatalogOneCourse key={course._id} {...course} />) : <h3 className="no-articles" style={{color:"red"}}>No articles yet</h3>}


                        </div>
                        <ul className="pagination-admin">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
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
            </section>

        </>
    )
}




    