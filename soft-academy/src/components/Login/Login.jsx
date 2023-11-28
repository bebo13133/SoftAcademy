import { UserContext, useAuthContext } from '../contexts/UserContext'
import './loginRegisterForms.css'
import { useForm } from '../Hooks/useForm'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Fade, Slide } from 'react-awesome-reveal'

export const Login = () => {



    const { onLoginSubmit ,formErrors} = useAuthContext()
console.log(formErrors)

    const { onSubmit, values, onChangeHandler } = useForm({
        email: "",
        password: "",
    }, onLoginSubmit)


    return (
        <>
        <Slide direction='right' delay="10" duration="2000" triggerOnce='true'>
            <section className="login-root-section">
                <section className="image-section">
                    <div className="image-container2">
                        <img src="./img/studentLearn.jpg" alt="Description of the image" />
                    </div>

                </section>



                <section id="login-page-login" className="auth">

                    <form id="login" className="login-form" method="POST" onSubmit={onSubmit}>
                        <ul>
                            <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                        </ul>
                        <div className="container-login">
                            <div className="brand-logo-login"></div>

                            <label htmlFor="email" >Email:</label>
                            <input type="email" className={formErrors.email ? "error": ""} id="email" name="email" placeholder="peter@gmail.com" value={values.email} onChange={onChangeHandler} />

                            <label htmlFor="login-password">Password:</label>
                            <input type="password" className={formErrors.password ? "error": ""} id="login-password" name="password" value={values.password} onChange={onChangeHandler} />
                         
                            <input type="submit" className="btn submit-button" value="Login" />
                            <label htmlFor="confirm-password" style={{ visibility: 'hidden' }}>Confirm Password:</label>
                            <input type="password" name="confirmPassword" id="confirm-password" style={{ visibility: 'hidden' }} value={values.confirmPassword} onChange={onChangeHandler} />
                            <p className="field">
                                <span>IF you don't have a PROFILE CLICK <Link to={"/register"}>here</Link></span>
                            </p>
                        </div>
                    </form>
                </section>
            </section>
            </Slide>
            <Footer />
        </>
    )

}
