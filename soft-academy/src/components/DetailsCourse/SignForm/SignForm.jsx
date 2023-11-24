
import { useEffect, useState } from "react"
import Footer from "../../Footer/Footer"
import "./signForm.css"
import { useForm } from "../../Hooks/useForm"
import { Link, useParams } from "react-router-dom"
import { useCourseContext } from "../../contexts/CourseContext"
import { useAuthContext } from "../../contexts/UserContext"
import { FaCheck } from 'react-icons/fa';
import { courseServiceFactory } from "../../Services/courseService"
import { HiChevronLeft } from "react-icons/hi2";

export const SignForm = () => {
    const [course,setCourse]=useState([])
    const { userId,token } = useAuthContext()
    const courseService = courseServiceFactory(token)
    const [isChecked, setIsChecked] = useState(false)
    // console.log(isChecked)
  

    const courseIdObject = useParams()
    // console.log(courseId.courseId,"courseId)courseId)courseId)")
    const courseId = courseIdObject.courseId
    const owner = userId
    const { onSignUp } = useCourseContext()
    const handleTermsChange = () => {
        setIsChecked(state => !state);
    };

    useEffect(()=>{
        courseService.getOne(courseId)
        .then(result=>{
            setCourse(result)
        })
        .catch(error => {
            console.log(error.message||error)
        })
    },[courseId,owner,userId])


    const { onSubmit, onChangeHandler, values } = useForm({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        socialNumber: "",
        courseId,
        isChecked,
        owner

    }, () => onSignUp({ ...values, isChecked }))// налага се да подам директно на функцият isChecked защото реда за изпълнение е асинхронен и не гарантира кое първо ще се изпълни 
    // и се изпълнява първо useForma взима старата стойност на isChecked 


    return (
        <>
            <div className="form-container-outer">

                <section className="form-container-sign">
                    
                    <form className="user-form-sign" onSubmit={onSubmit}>
                        <div style={{display:"flex",flexDirection:"row", gap:"5px", alignItems:"center", marginBottom:"10px",marginTop:"10px"}}><HiChevronLeft  /><Link to={`/catalog/${courseId}`}className="show-more-button-back"> back </Link></div>
          

                        <h3>Sign up for a course - <strong>{course.courseName}</strong></h3>
                        <div className="divider"></div>

                        <div className="name-inputs-sign">
                            <input type="text" name="firstName" className="first-name" value={values.firstName} placeholder="First Name" onChange={onChangeHandler} />
                            <input type="text" name="lastName" className="last-name" value={values.lastName} placeholder="Last Name" onChange={onChangeHandler} />
                        </div>
                        <input type="tel" name="phoneNumber" className="phone-number" value={values.phoneNumber} placeholder="Phone Number" onChange={onChangeHandler} />
                        <input type="number" name="socialNumber" className="dna-number" value={values.socialNumber} placeholder="Social number" onChange={onChangeHandler} />
                        <label >
                            <input className="checkbox-sign"
                                name="checkbox-sign"
                                id="checkbox-sign"
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleTermsChange}
                            />
                            I accept the terms and conditions
                        </label>
                        <div className="divider"></div>

                        <button type="submit" className="how-more-button-signUp" >Sign Up</button>
                        <ul>
                <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right",marginTop: "-35px" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
            </ul>
                    </form>

                </section>
                <section className="sign-course-card-finish">
                    <img className="sign-course-img" src="/img/joinUp.webp" alt="sign-course" />
                    <h2>Course: <span>{course.courseName}</span> </h2>
                    <h3> Price: {course.price}</h3>
                    <span></span>
                    <p className="lector-disc">  <FaCheck color="red" /> Start in: 
                    </p>
                    <h4 className="lector-disc-h4">{course.date}</h4>

                    <p className="lector-disc"> <FaCheck color="red" />  Duration of the course</p>

                    <h4 className="lector-disc-h4"> {course.weeksCourse} weeks </h4>

                </section>

            </div>
            <Footer />
        </>
    )

}