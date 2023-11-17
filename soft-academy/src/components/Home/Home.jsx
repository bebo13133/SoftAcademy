import { Link, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect, Suspense, lazy } from "react"
import { Bounce, Fade,Flip,Hinge,JackInTheBox,Roll,Rotate,Slide, Zoom  } from "react-awesome-reveal";
// import { ChatBox } from "../ChatBox/ChatBox"
import 'animate.css'
import './homePage.css'
import { InfinitySlide } from "../InfinitySlide/InfinitySlide"
import { WaveAnimation } from "../tools/WaveAnimation"
import { IsLoading } from "../IsLoading/IsLoading"
import { useCourseContext } from "../contexts/CourseContext"
import { courseServiceFactory } from "../Services/courseService"
// import { HomeOneCourse } from "./HomeOneCourse"
const HomeOneCourse = lazy(() => import("./HomeOneCourse"))

import { SearchField } from "../SearchPage/SearchField"
import { LastForumsCarousel } from "./LastForumsCarousel/LastForumsCarousel"
import Footer from "../Footer/Footer"
import { WyWeStudy } from "./WyWeStudy/WyWeStudy"
import { LanguageBar } from "./LanguageBar/LanguageBar"

 const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])

    const courseService = courseServiceFactory()


    useEffect(() => {
        courseService.getAll()
            .then(result => {


                // console.log(result)
                result.sort((a, b) => (b._createdOn) - (a._createdOn));

                // Get the last 3 courses
                const lastThreeCourses = result.slice(length - 1, 3)

                setCourses(lastThreeCourses)

            })
            .catch(err => {
                throw new Error(err.message || err)

            });

        setIsLoading(false)
    }, []);


    return (
        <>
            {isLoading ? <IsLoading /> : (<> 
                <section id="home" className="welcome-hero">
                <div className="container">
                    <div className="welcome-hero-txt">
                        <Slide direction="right" duration="2500" triggerOnce='true'>
                        <h2>Welcome  in software world  <br />and best  software engineering courses </h2>
                        </Slide>
                        <Slide direction="left" duration="2500" triggerOnce='true'>
                        <p >
                            Find Best Place, Restaurant, Hotel, Real State and many more think in just One click
                        </p>
                        </Slide>

                        <Slide direction="right" duration="2500" triggerOnce='true'>
                        <p style={{color:"#cf8800"}}><i className="fa fa-check" aria-hidden="true"style={{color:"#cf8800"}}></i>&nbsp;Comprehensive Software program</p>
                        </Slide>
                        <Slide direction="left" duration="2500" triggerOnce='true'>
                        <p style={{color:"#cf8800"}}><i className="fa fa-check" aria-hidden="true" style={{color:"#cf8800"}}></i>&nbsp;Learn how build DIY apps yourself&nbsp;&nbsp;
                            </p>
                        </Slide>
                        <Slide direction="right" duration="2500" triggerOnce='true'>
                        <p style={{color:"#cf8800"}}><i className="fa fa-check" aria-hidden="true" style={{color:"#cf8800"}}></i>&nbsp;Become a successful software engineer</p>
                        </Slide>
                    </div>
                    
                    <SearchField />

                </div>

            </section>

            <section id="list-topics" className="list-topics">
                <WaveAnimation />
                <div className="container">
                    <div className="list-topics-content">
                        <ul>
                            <li>
                                <Link to={"https://www.javascript.com/"} target="_blank" rel="noopener noreferrer">
                                    <div className="single-list-topics-content">
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/javascript-7308311-5938360.webp"  alt="javascript"/>
                                        </div>
                                        <h2>JavaScript</h2>
                                        <p>1 444 231 Libraries</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={"https://learn.microsoft.com/en-us/dotnet/csharp/"} target="_blank" rel="noopener noreferrer">                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <img className="home-top-lang" src="./img/c-sharp.png" alt="csharp"/>
                                    </div>
                                    <h2>c-sharp</h2>
                                    <p>214223 listings</p>
                                </div>
                                </Link>

                            </li>
                            <li>
                                <Link to={"https://www.java.com/en/"} target="_blank" rel="noopener noreferrer">
                                    <div className="single-list-topics-content">
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/java.webp" alt="Java"/>

                                        </div>
                                        <h2>Java</h2>

                                        <p>1118543 listings</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={"https://www.python.org/"} target="_blank" rel="noopener noreferrer">
                                    <div className="single-list-topics-content">
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/pythonLogo.png" alt="Python"/>

                                        </div>
                                        <h2>Python</h2>

                                        <p>200323 listings</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={"https://legacy.reactjs.org/"} target="_blank" rel="noopener noreferrer">
                                    <div className="single-list-topics-content">
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/react.png" alt="ReactJs"/>

                                        </div>
                                        <h2>ReactJs</h2>
                                        <p>1604301 listings</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </section>

            <div className="section-header">
                <h2 style={{ color: "#BD6813" }}>we partner with</h2>
                <Fade triggerOnce="true"
                // direction='down'
                 duration="3000" >
                <InfinitySlide />
            </Fade>
            
            </div>
            <br />
            <br />
 <Fade delay="50" duration="4000" triggerOnce='true'>
            <section id="works" className="works">
                <div className="container">
                    <div className="section-header">
                        <h2>last courses</h2>
                        <p>Learn More about courses our website </p>
                    </div>
                    
                    <div className="works-content">
              
                        <div className="row">
                            {/* one course */}
                          
                            {courses.length > 0 ? courses.map(course => <HomeOneCourse key={course._id} {...course} />) : <h2 className="no-articles">No courses yet</h2>}
                          
                        </div>
                        
                    </div>
                  
                </div>

            </section>
            </Fade>
            <Slide direction='right' duration="3000" triggerOnce='true' >
            <LanguageBar/>
            </Slide>
            <Slide duration="3000" triggerOnce='true'>
            <WyWeStudy />
            </Slide >
            <Slide direction='up' duration="1000"  triggerOnce='true'>
            <LastForumsCarousel />
            </Slide>
            <ul>
                <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
            </ul>
            <Footer />
            
            </>)}


        </>
    )
}
export default Home