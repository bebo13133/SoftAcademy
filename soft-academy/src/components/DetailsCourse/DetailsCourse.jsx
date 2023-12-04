import { useEffect, useState } from "react"
import * as commentsService from "../Services/commentsService"
import { Link, useParams } from "react-router-dom"
import { Fade,Slide } from "react-awesome-reveal";
import '../../../public/img/detailsSide.jpg'

import { courseServiceFactory } from "../Services/courseService"
import { useService } from "../Hooks/useService"
import { OneCourse } from "./OneCourse"
import { AddComments } from "../Comments/AddComments"
import { LectorPage } from "./LectorsPage"
import Footer from "../Footer/Footer"
import { SignUpCourse } from "./SignUpCourse"
import { v4 } from "uuid"
import './imageSideBar.css'

export const DetailsCourse = () => {
    const [details, setDetails] = useState({})
    // const [comments, setComments] = useState([])
    const { courseId } = useParams()
    const courseService = useService(courseServiceFactory)


    useEffect(() => {
        courseService.getOne(courseId)
            .then(course => {
                course && setDetails(course)


            })
            .catch(error => {
                console.error('Error:', error);
            })

    }, [courseId])




    return (

        <> 
        <Fade delay="10" duration="2000" triggerOnce='true'>
            <section id="details-page">
                {/* <Slide direction='left' delay="10" duration="2000" triggerOnce='true'> */}
                    <div className="image-section-details">
                        {/* Добавете снимката тук */}
                        <img src="/img/detailsSide.jpg" alt="Course Catalog Image" />
                    </div>
                {/* </Slide> */}
                <OneCourse {...details} />
                <LectorPage {...details} />
                <SignUpCourse key={v4()} {...details} />
                {/* <AddComments onCommentSubmit={onCommentSubmit} /> */}

            </section>
            <ul>
                <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
            </ul>
           
        </Fade>
        <Footer />
        </>
    )
}