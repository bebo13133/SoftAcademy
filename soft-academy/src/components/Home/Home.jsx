import { Link, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect, Suspense, lazy } from "react"
import { Bounce, Fade, Flip, Hinge, JackInTheBox, Roll, Rotate, Slide, Zoom } from "react-awesome-reveal";
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
import { WelcomeScreen } from "./WelcomeScreen/WelcomeScreen";
import { ListTopics } from "./ListTopics/ListTopics";

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
                console.log(err.message || err)

            });

        setIsLoading(false)
    }, []);


    return (
        <>
            {isLoading ? <IsLoading /> : (<>
                <WelcomeScreen />

                <ListTopics />

                <div className="section-header section-header1">
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
                            <div className="section-header section-header1">
                                <h2>last courses</h2>
                                <h3>Learn More about courses our website </h3>
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
                    <LanguageBar />
                </Slide>
                <Slide duration="3000" triggerOnce='true'>
                    <WyWeStudy />
                </Slide >
                <Slide direction='up' duration="1000" triggerOnce='true'>
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