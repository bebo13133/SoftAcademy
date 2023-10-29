import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { courseServiceFactory } from "../Services/courseService"
import { useService } from "../Hooks/useService"
import { OneCourse } from "./OneCourse"


export const DetailsCourse = () => {
const [details,setDetails] = useState([])

const {courseId} = useParams()
const courseService=useService(courseServiceFactory)
useEffect(()=>{
     courseService.getOne(courseId)
        .then(course =>{
           return setDetails(course)
        // TODO: Липсва errorHandling
        })

},[courseId])

    return (
   
        <section id="details-page">
         
            <OneCourse {...details}/>

            </section>
    )
}