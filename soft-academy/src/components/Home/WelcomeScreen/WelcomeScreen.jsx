import { Slide } from "react-awesome-reveal"
import { SearchField } from "../../SearchPage/SearchField"

export const WelcomeScreen=() =>{

    return(
         <section id="home" className="welcome-hero">
                    <div className="container">
                        <div className="welcome-hero-txt">
                            <Slide direction="right" duration="2500" triggerOnce='true'>
                                <h2>Welcome  in software world  <br />and best  software engineering courses </h2>
                            </Slide>
                          

                            <Slide direction="right" duration="2500" triggerOnce='true'>
                                <p style={{ color: "#cf8800" }}><i className="fa fa-check" aria-hidden="true" style={{ color: "#cf8800" }}></i>&nbsp;Comprehensive Software program</p>
                            </Slide>
                            <Slide direction="left" duration="2500" triggerOnce='true'>
                                <p style={{ color: "#cf8800" }}><i className="fa fa-check" aria-hidden="true" style={{ color: "#cf8800" }}></i>&nbsp;Learn how build DIY apps yourself&nbsp;&nbsp;
                                </p>
                            </Slide>
                            <Slide direction="right" duration="2500" triggerOnce='true'>
                                <p style={{ color: "#cf8800" }}><i className="fa fa-check" aria-hidden="true" style={{ color: "#cf8800" }}></i>&nbsp;Become a successful software engineer</p>
                            </Slide>
                            <Slide direction="left" duration="2500" triggerOnce='true'>
                                <p >
                                Explore an array of courses with just a click! Find the best educational programs tailored to your interests and career goals. 
                                Uncover a world of learning opportunities right at your fingertips.
                                </p>
                            </Slide>
                        </div>

                        <SearchField />

                    </div>

                </section>


    )
}