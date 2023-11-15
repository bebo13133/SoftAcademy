import { Link, useNavigate } from "react-router-dom"
import './languageBar.css'
import { lazy } from "react"
import './singleContent.css'


import { useForumContext } from "../../contexts/ForumContext"
import { useCourseContext } from "../../contexts/CourseContext"





export const LanguageBar = () => {
    const navigate = useNavigate()
    const { onSubmitLanguageBar } = useCourseContext()

    const handleLanguageClick = (language) => {
        onSubmitLanguageBar(language)
        navigate('/language-catalog')
    }


    return (
        <>
            <div className="blue-bar-h2">
                <h2>become a graduate programmer</h2>
                <h3>choose a path with a given language</h3>
            </div>

            <div className="blue-bar-language">



            </div>
            <section id="list-topics" className="list-topics">

                <div className="container">
                    <div className="list-topics-content">
                        <ul>
                            <li>
                                <Link to={'/language-catalog'} rel="noopener noreferrer">
                                    <div className="single-list-topics-content single-class" onClick={() => handleLanguageClick("JavaScript")}>
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/javascript-7308311-5938360.webp" />
                                        </div>
                                        <h2>JavaScript</h2>
                                        <p>JavaScript courses</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/language-catalog'} rel="noopener noreferrer">
                                    <div className="single-list-topics-content single-class" onClick={() => handleLanguageClick("C#")}>
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/c-sharp.png" />
                                        </div>
                                        <h2>c-sharp</h2>
                                        <p>c-sharp courses</p>
                                    </div>

                                </Link>

                            </li>
                            <li>
                                <Link to={'/language-catalog'} rel="noopener noreferrer">
                                    <div className="single-list-topics-content single-class" onClick={() => handleLanguageClick("Java")}>
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/java.webp" />

                                        </div>
                                        <h2>Java</h2>

                                        <p>Java courses</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/language-catalog'} rel="noopener noreferrer">
                                    <div className="single-list-topics-content single-class" onClick={() => handleLanguageClick("Python")}>
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/Python-logo-notext.svg.png" />

                                        </div>
                                        <h2>Python</h2>

                                        <p>Python courses</p>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/language-catalog'} rel="noopener noreferrer">
                                    <div className="single-list-topics-content single-class" onClick={() => handleLanguageClick("ReactJS")}>
                                        <div className="single-list-topics-icon">
                                            <img className="home-top-lang" src="./img/react.png" />

                                        </div>
                                        <h2>ReactJs</h2>
                                        <p>ReactJs courses</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </section>


        </>

    )

}