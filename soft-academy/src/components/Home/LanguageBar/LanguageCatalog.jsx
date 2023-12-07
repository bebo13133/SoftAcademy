
import { useContext, useState, useEffect } from "react"
import { CourseContext, useCourseContext } from "../../contexts/CourseContext"

import Footer from "../../Footer/Footer"
import { CatalogOneCourse } from "./CatalogOneCourse"
import { usePaginations } from "../../Hooks/usePaginations"
import { Pagination } from "../../Pagination/Pagination"
import { useNavigate } from "react-router-dom"



export const LanguageCatalog=()=>{
const [courses,setCourses] = useState([])
    const { languages } = useCourseContext()
  const navigate = useNavigate()
 const resultPerPage = 3

 const {getPaginationData}=usePaginations(resultPerPage)
const {totalPages,currentResult,currentPage,paginate}=getPaginationData(courses)
const handleBackClick=()=>{


    navigate("/")
}
    useEffect(() => {

        languages && setCourses(languages)

    }, [languages])
 


    
    return (
        <>
          

            <section id="explore" className="explore">
                <div className="container">
                <div className="section-header">
                            <h2 style={{color: "rgb(2 93 139)", textShadow: "0 4px 8px rgb(109 20 37)"}}>Courses  </h2>
                            <p style={{fontSize:"22px", color:"#fffefd"}}>Unlocking Knowledge and Skills for You</p>
                        </div>
                    <div className="explore-content">
                        <div className="row">


                            {currentResult.length > 0 ?  currentResult.map(course => <CatalogOneCourse key={course._id} {...course} />) : <div style={{marginLeft:"35%"}}><h3 className="no-articles" style={{marginTop: "100px",
    color: "#dd6007", textShadow: "0 4px 8px rgb(105 152 253 / 36%)"}}>No courses yet</h3><button style={{fontSize:"24px",marginTop:"20px"}} onClick={handleBackClick}>Back</button></div>}


                        </div>
                        <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage}/>
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




    