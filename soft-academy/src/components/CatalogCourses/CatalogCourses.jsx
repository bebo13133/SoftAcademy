import { useContext, useState, useEffect } from "react"


import { CourseContext, useCourseContext } from "../contexts/CourseContext"
import { IsLoading } from "../IsLoading/IsLoading"
import { OneCourse } from "./OneCourse"
import Footer from "../Footer/Footer"

const CatalogCourses = () => {

    const { courses } = useContext(CourseContext)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        setIsLoading(false)

    }, [])

    return (
        <>
            {isLoading ? <IsLoading /> : (<> <section id="explore" className="explore">
                <div className="container">
                    <div className="section-header">
                        <h2>Courses</h2>
                        <p>Explore New place, food, culture around the world and many more</p>
                    </div>
                    <div className="explore-content">
                        <div className="row">



                            {courses.length > 0 ? courses.map(course => <OneCourse key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}


                        </div>


                    </div>
                </div>
                <ul>
                    <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                </ul>
                <Footer />
            </section></>
            )}

        </>
    )
}
export default CatalogCourses