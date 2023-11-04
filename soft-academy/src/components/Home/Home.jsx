import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

// import { ChatBox } from "../ChatBox/ChatBox"
import { InfinitySlide } from "../InfinitySlide/InfinitySlide"
import { WaveAnimation } from "../tools/WaveAnimation"
import { IsLoading } from "../IsLoading/IsLoading"
import { useCourseContext } from "../contexts/CourseContext"
import { courseServiceFactory } from "../Services/courseService"
import { HomeOneCourse } from "./HomeOneCourse"

export const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])

    const courseService = courseServiceFactory()
    const { } = useCourseContext()

    useEffect(() => {
        courseService.getAll()
            .then(result => {
           

                console.log(result)
                  result.sort((a, b) =>(b._createdOn) - (a._createdOn));

                // Get the last 3 courses
                const lastThreeCourses = result.slice(length-1,3)

                setCourses(lastThreeCourses)
                setIsLoading(false)
            })
            .catch(err => {
                throw new Error(err.message || err)
            });
    }, []);


    return (
        <>
            {isLoading && <IsLoading />}

            <section id="home" className="welcome-hero">
                <div className="container">
                    <div className="welcome-hero-txt">
                        <h2>best place to find and explore <br /> that all you need </h2>
                        <p>
                            Find Best Place, Restaurant, Hotel, Real State and many more think in just One click
                        </p>

                    </div>
                    <div className="welcome-hero-serch-box">
                        <div className="welcome-hero-form">
                            <div className="single-welcome-hero-form">
                                <h3>what?</h3>
                                <form action="index.html">
                                    <input type="text" placeholder="Ex: palce, resturent, food, automobile" />
                                </form>
                                <div className="welcome-hero-form-icon">
                                    <i className="flaticon-list-with-dots"></i>
                                </div>
                            </div>
                            <div className="single-welcome-hero-form">
                                <h3>location</h3>
                                <form action="index.html">
                                    <input type="text" placeholder="Ex: london, newyork, rome" />
                                </form>
                                <div className="welcome-hero-form-icon">
                                    <i className="flaticon-gps-fixed-indicator"></i>
                                </div>
                            </div>
                        </div>
                        <div className="welcome-hero-serch">
                            {/* <button className="welcome-hero-btn" onClick= {(window.location.href='#')}>
                                search  <i data-feather="search"></i>
                            </button> */}
                        </div>
                    </div>

                </div>

            </section>


            <section id="list-topics" className="list-topics">
                <WaveAnimation />
                <div className="container">
                    <div className="list-topics-content">
                        <ul>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <img className="home-top-lang" src="./img/javascript-7308311-5938360.webp" />
                                    </div>
                                    <h2><Link to={"https://www.javascript.com/"} target="_blank" rel="noopener noreferrer">JavaScript</Link></h2>
                                    <p>1 444 231 Libraries</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <img className="home-top-lang" src="./img/c-sharp.png" />
                                    </div>
                                    <h2><Link to={"https://learn.microsoft.com/en-us/dotnet/csharp/"} target="_blank" rel="noopener noreferrer">c-sharp</Link></h2>
                                    <p>214223 listings</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <img className="home-top-lang" src="./img/java.webp" />

                                    </div>
                                    <h2><Link to={"https://www.java.com/en/"} target="_blank" rel="noopener noreferrer">Java</Link></h2>

                                    <p>1118543 listings</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <img className="home-top-lang" src="./img/Python-logo-notext.svg.png" />

                                    </div>
                                    <h2><Link to={"https://www.python.org/"} target="_blank" rel="noopener noreferrer">Python</Link></h2>

                                    <p>200323 listings</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <img className="home-top-lang" src="./img/react.png" />

                                    </div>
                                    <h2><Link to={"https://legacy.reactjs.org/"} target="_blank" rel="noopener noreferrer">ReactJs</Link></h2>
                                    <p>1604301 listings</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </section>
            <div className="section-header">
                <h2 style={{ color: "#BD6813" }}>we partner with</h2>
                <InfinitySlide />
            </div>
            <br />
            <br />
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
        </>
    )
}