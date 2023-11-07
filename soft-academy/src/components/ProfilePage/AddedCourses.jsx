import { useState,useEffect } from "react"
import { OneAddedCourse } from "./OneAddedCourse"
import { courseServiceFactory } from "../Services/courseService"
import { useAuthContext } from "../contexts/UserContext"
import { ProfileSidebar } from "./ProfileSidebar"

export const AddedCourses = () => {
    const {userId}=useAuthContext()
const courseService =courseServiceFactory()
const [courses,setCourses] = useState([])

useEffect(() =>{

    courseService.getAll()
    .then(result=>{

        const ownerCourses = result.filter(course => course._ownerId === userId)
        // console.log(userId)

        console.log(ownerCourses,result)

         setCourses(ownerCourses)
        console.log(courses)

    })



},[])


    return (

        <>
          <ProfileSidebar style={{
            top:0, 
            width:'215px', 
            zIndex:40,
            }} />
            <section id="explore" className="explore" style={{height: "376px"}}>
                <div className="container">
                    <div className="section-header">
                        <h2>Courses</h2>
                        <p>Explore New place, food, culture around the world and many more</p>
                    </div>
                    <div className="explore-content">
                        <div className="row">



                            {courses.length > 0 ? courses.map(course => <OneAddedCourse 
                            // key={course._id} 
                            {...course} />) : <h3 className="no-articles">No articles yet</h3>}


                        </div>


                    </div>
                </div>

            </section>
        </>
    )

}