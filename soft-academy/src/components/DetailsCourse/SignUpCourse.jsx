import { useNavigate } from "react-router-dom"
import "./signUpCourse.css"
import { useCourseContext } from "../contexts/CourseContext"
import { useEffect, useState } from "react"
import { courseServiceFactory } from "../Services/courseService"
import { useAuthContext } from "../contexts/UserContext"


export const SignUpCourse = ({
    weeksCourse,
    creditsCourse,
    date,
    courseName,
    _id,

}) => {

    const [studentsPayment, setStudentsPayment] = useState([])
    console.log(studentsPayment, "'students")
    const { token, userId } = useAuthContext()
    const courseService = courseServiceFactory(token)


    // const {students} = useCourseContext()

    const navigate = useNavigate()
    const courseId = _id



    useEffect(() => {
        courseService.getAllStudentsPayment(courseId)
            .then(result => {
                console.log(result,"payment result")
                setStudentsPayment(state => result.filter(x => x.userId === userId))
            })
    }, [courseId, userId])

    const isSignUp = studentsPayment.length > 0

    const onStudentSign = () => {

        navigate(`./sign-form`)
    }

    return (
        <>
            <div>
                <div className="sign-course-card">
                    <img className="sign-course-img" src="/img/joinUp.webp" alt="sign-course" />
                    <h2>Course: <span>{courseName}</span> </h2>
                    <p className="lector-disc"><span role="img" aria-label="play">▶</span> Start in: {date}
                    </p>
                    <p className="lector-disc"> <span role="img" aria-label="calendar">📆</span> {weeksCourse} weeks </p>

                    <p className="lector-disc"> <span role="img" aria-label="credits">💳</span> {creditsCourse} credits </p>
                    {!isSignUp ? 
                    <button className="show-more-button-join" onClick={onStudentSign}>Sign Up</button> 
                      : (<div className="sign-h2"><h3>You already in course</h3></div>)} 
                </div>
                {/* {!showMore && <button className="show-more-button-course" onClick={toggleShowMore}>Show More</button>}
                {showMore && <button className="show-more-button-course" onClick={toggleShowMore}>Show Less</button>} */}
            </div>
        </>
    )
}
