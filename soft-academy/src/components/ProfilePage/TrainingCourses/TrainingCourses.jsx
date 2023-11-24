import { useEffect, useState } from "react"
import { IsLoading } from "../../IsLoading/IsLoading"
import { ProfileSidebar } from "../ProfileSidebar"

import { usePaginations } from "../../Hooks/usePaginations"
import { courseServiceFactory } from "../../Services/courseService"
import { useAuthContext } from "../../contexts/UserContext"
import { useCourseContext } from "../../contexts/CourseContext"
import { OnePaymentCourse } from "../OnePaymentCourse"
import { Pagination } from "../../Pagination/Pagination"
import { Fade } from "react-awesome-reveal"

export const TrainingCourses = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [payMentCourse, setPayMentsCourses] = useState([])
    const [payCourses, setMyPayCourses] = useState([])

    const { courses } = useCourseContext()
    const { userId, token } = useAuthContext()

    const courseService = courseServiceFactory(token)



    const resultPerPage = 3
    const { getPaginationData } = usePaginations(resultPerPage)
    const { totalPages, currentPage, currentResult, paginate,setCurrentPage } = getPaginationData(payMentCourse)

    useEffect(() => {

        courseService.getAllPaymentsByUser(userId)
            .then(result => {

                setMyPayCourses(result)
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
            
        setIsLoading(false)
    }, [courses, userId])

    useEffect(() => {
        const paymentID = payCourses.map(x => x.courseId)//взимам само тези с courseId
     
        const myCourses = courses.filter(course => {
            return paymentID.includes(course._id) // отделям мойте курсове
        })

        setPayMentsCourses(myCourses)
        // setIsLoading(false)


    }, [courses, payCourses])

    return (
        <>
            <ProfileSidebar />
           {isLoading ? <IsLoading/> : (<Fade delay="50" duration="4000" triggerOnce='true'>
                <section id="explore" className="explore" style={{ height: "376px" }}>

                    <div className="container">
                        <div className="section-header">
                            <h2>Courses</h2>
                            <p>Explore New place, food, culture around the world and many more</p>
                        </div>
                        <div className="explore-content">
                            <div className="row">


                                {currentResult.length > 0 ? currentResult.map(course => <OnePaymentCourse key={course._id} {...course} />) : <h3 className="no-articles">No courses yet</h3>}

                            </div>
                            <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                        </div>
                    </div>

                </section>
            </Fade>)}

        </>
    )
}