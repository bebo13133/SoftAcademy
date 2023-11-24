
import { useState } from "react"
import Footer from "../../Footer/Footer"
import "./signForm.css"
import { useForm } from "../../Hooks/useForm"
import { useParams } from "react-router-dom"
import { useCourseContext } from "../../contexts/CourseContext"
import { useAuthContext } from "../../contexts/UserContext"
import { FaCheck } from 'react-icons/fa';

export const SignForm = () => {
    const [isChecked, setIsChecked] = useState(false)
    console.log(isChecked)
    const { userId } = useAuthContext()

    const courseIdObject = useParams()
    // console.log(courseId.courseId,"courseId)courseId)courseId)")
const courseId =courseIdObject.courseId 
    const owner = userId
    const { onSignUp } = useCourseContext()
    const handleTermsChange = () => {
        setIsChecked(state => !state);
    };

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
                        <h3>Sign up for a course -</h3>
                        <div className="divider"></div>

                        <div className="name-inputs-sign">
                            <input type="text" name="firstName" className="first-name" value={values.firstName} placeholder="First Name" onChange={onChangeHandler} />
                            <input type="text" name="lastName" className="last-name" value={values.lastName} placeholder="Last Name" onChange={onChangeHandler} />
                        </div>
                        <input type="tel" name="phoneNumber" className="phone-number" value={values.phoneNumber} placeholder="Phone Number" onChange={onChangeHandler} />
                        <input type="text" name="socialNumber" className="dna-number" value={values.socialNumber} placeholder="Social number" onChange={onChangeHandler} />
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

                    </form>

                </section>
                <section className="sign-course-card-finish">
                    <img className="sign-course-img" src="/img/joinUp.webp" alt="sign-course" />
                    <h2>Course: <span>""</span> </h2>
                    <h3  > Price ""</h3>
                    <span></span>
                  <p className="lector-disc">  <FaCheck color="red"/> Start in: ""
                    </p>
                    <p className="lector-disc">19.10.2023</p>
                   
                    <p className="lector-disc"> <FaCheck color="red"/>  Duration of the course</p>

                    <p className="lector-disc"> "" weeks </p>

                </section>

            </div>
            <Footer />
        </>
    )

}