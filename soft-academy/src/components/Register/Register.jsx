import { Link } from "react-router-dom"
import { useForm } from "../Hooks/useForm"
import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import'./loginRegisterForms.css'
import Footer from "../Footer/Footer"
import { Fade, Slide } from "react-awesome-reveal"


export const Register = () => {

    const { onRegisterSubmit ,formError} = useContext(UserContext)
    const { onSubmit, onChangeHandler, values } = useForm({
        email: "",
        password: "",
        confirmPassword: "",
    }, onRegisterSubmit)

    return (
        <>
         <Slide direction='left' delay="10" duration="2000" triggerOnce='true'>
            <section className="login-root-section">
                <section className="image-section">
                    <div className="image-container1">
                        <img src="./img/studentLearn.jpg" alt="Description of the image" />
                    </div>

                </section>



                <section id="login-page-login" className="auth">

                    <form id="register" className="login-form" method="POST" onSubmit={onSubmit}>
                        <ul>
                            <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                        </ul>
                        <div className="container-login" data-testid="parent-container">
                            <div className="brand-logo-login"></div>

                            <label htmlFor="email">Email:</label>
                            <input type="email" className={formError.email ? "error": ""} id="email" name="email" placeholder="peter@gmail.com" value={values.email} onChange={onChangeHandler} />

                            <label htmlFor="login-password">Password:</label>
                            <input type="password" className={formError.password ? "error": ""} id="login-password" name="password" value={values.password} onChange={onChangeHandler} />
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input type="password" className={formError.confirmPassword ? "error": ""} name="confirmPassword" id="confirm-password" value={values.confirmPassword} onChange={onChangeHandler} />
                            <input type="submit" className="btn submit-button" value="Register" data-testId="register-button" />

                            <p className="field">
                                <span>IF you have a PROFILE CLICK <Link to={"/login"}>here</Link></span>
                            </p>
                        </div>
                    </form>
                    
                </section>
               
            </section>
            </Slide>
            <Footer/>
        </>

    )
}


