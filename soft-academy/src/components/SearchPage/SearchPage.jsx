// import { OneCourse } from "../CatalogCourses/OneCourse"
import { WaveAnimation } from "../tools/WaveAnimation"
import { SearchField } from "./SearchField"
import { Link } from "react-router-dom"
import { useCourseContext } from "../contexts/CourseContext"
import { HomeOneCourse } from "../Home/HomeOneCourse"
export const SearchPage = ({

}) => {
    const { searchResult } = useCourseContext()

    return (
        <>
            <section id="home" className="welcome-hero">
                <div className="container">
                    <div className="welcome-hero-txt">
                        <h2>best place to find and explore <br /> that all you need </h2>
                        <p>
                            Find Best Place, Restaurant, Hotel, Real State and many more think in just One click
                        </p>

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

            <br />
            <br />
            <section id="works" className="works">
                <div className="container">
                    <div className="section-header">
                        <h2>Result from search</h2>
                        {/* <p>Learn More about courses our website </p> */}
                    </div>
                    <div className="works-content">
                        <div className="row">
                            {/* one course */}
                            {searchResult.length >0 ? searchResult.map(x => <HomeOneCourse key={x._id} {...x} />): (<h2 className="no-articles">No results</h2>)}
                        </div>
                    </div>
                </div>

            </section>



        </>
    )
}