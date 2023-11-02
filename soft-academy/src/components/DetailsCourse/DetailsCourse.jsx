import { useEffect, useState } from "react"
import * as commentsService from "../Services/commentsService"
import { Link, useParams } from "react-router-dom"
import { courseServiceFactory } from "../Services/courseService"
import { useService } from "../Hooks/useService"
import { OneCourse } from "./OneCourse"
import { AddComments } from "../Comments/AddComments"
import { LectorPage } from "./LectorsPage"


export const DetailsCourse = () => {
    const [details, setDetails] = useState({})
    const [comments, setComments] = useState([])
    const { courseId } = useParams()
    const courseService = useService(courseServiceFactory)
    useEffect(() => {
        courseService.getOne(courseId)
            .then(course => {
                setDetails(course)
                return commentsService.getAllComments(courseId)

            }).then(course => {
                
                setComments(course)
            
            })

    }, [courseId])

    const onCommentSubmit = async (values) => {
        const result = await commentsService.createComment(
            courseId,
            values.comment
        )

        setComments((state) => [...state, { comment: result.comment }]) //TODO ДА СЕ ДОБАВИ USERNAME, КАТО ВТОРИ ПАРАМЕТЪР


    }

    return (

        <section id="details-page">

            <OneCourse {...details} comments={comments} onCommentSubmit={onCommentSubmit} />
            <LectorPage/>
            <AddComments onCommentSubmit={onCommentSubmit} />

        </section>
    )
}