import { Link } from "react-router-dom"
import { WaveAnimation } from "../../tools/WaveAnimation"

export const ListTopics=()=>{

    return(
        <section id="list-topics" className="list-topics">
        <WaveAnimation />
        <div className="container">
            <div className="list-topics-content">
                <ul>
                    <li>
                        <Link to={"https://www.javascript.com/"} target="_blank" rel="noopener noreferrer">
                            <div className="single-list-topics-content">
                                <div className="single-list-topics-icon">
                                    <img className="home-top-lang" src="./img/javascript-7308311-5938360.webp" alt="javascript" />
                                </div>
                                <h2>JavaScript</h2>
                                <p>1 444 231 Libraries</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={"https://learn.microsoft.com/en-us/dotnet/csharp/"} target="_blank" rel="noopener noreferrer">                                <div className="single-list-topics-content">
                            <div className="single-list-topics-icon">
                                <img className="home-top-lang" src="./img/c-sharp.png" alt="csharp" />
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
                                    <img className="home-top-lang" src="./img/java2.png" alt="Java" />

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
                                    <img className="home-top-lang" src="./img/pythonLogo.png" alt="Python" />

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
                                    <img className="home-top-lang" src="./img/react.png" alt="ReactJs" />

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
    )
}