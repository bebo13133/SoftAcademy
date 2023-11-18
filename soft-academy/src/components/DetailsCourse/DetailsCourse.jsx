import { useEffect, useState } from "react"
import * as commentsService from "../Services/commentsService"
import { Link, useParams } from "react-router-dom"
import { courseServiceFactory } from "../Services/courseService"
import { useService } from "../Hooks/useService"
import { OneCourse } from "./OneCourse"
import { AddComments } from "../Comments/AddComments"
import { LectorPage } from "./LectorsPage"
import Footer from "../Footer/Footer"


export const DetailsCourse = () => {
    const [details, setDetails] = useState({})
    const [comments, setComments] = useState([])
    const { courseId } = useParams()
    const courseService = useService(courseServiceFactory)


    useEffect(() => {
        courseService.getOne(courseId)
            .then(course => {
               course && setDetails(course)
               return commentsService.getAllComments(courseId)

            }).then(course => {

                course && setComments(course)

            })
            .catch(error => {
                console.error('Error:', error);
            })

    }, [courseId])




    return (
        <>
            <section id="details-page">

                <OneCourse {...details} comments={comments} 
                // onCommentSubmit={onCommentSubmit} 
                />
                <LectorPage {...details} />
                {/* <AddComments onCommentSubmit={onCommentSubmit} /> */}

            </section>
            <ul>
                <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
            </ul>
            <Footer />
        </>
    )
}