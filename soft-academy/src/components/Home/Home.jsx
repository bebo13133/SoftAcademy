import { ChatBox } from "../ChatBox/ChatBox"

export const Home = () => {
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
                <div className="container">
                    <div className="list-topics-content">
                        <ul>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <i className="flaticon-restaurant"></i>
                                    </div>
                                    <h2><a href="#">resturent</a></h2>
                                    <p>150 listings</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <i className="flaticon-travel"></i>
                                    </div>
                                    <h2><a href="#">destination</a></h2>
                                    <p>214 listings</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <i className="flaticon-building"></i>
                                    </div>
                                    <h2><a href="#">hotels</a></h2>
                                    <p>185 listings</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <i className="flaticon-pills"></i>
                                    </div>
                                    <h2><a href="#">healthcaree</a></h2>
                                    <p>200 listings</p>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content">
                                    <div className="single-list-topics-icon">
                                        <i className="flaticon-transport"></i>
                                    </div>
                                    <h2><a href="#">automotion</a></h2>
                                    <p>120 listings</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="works" className="works">
                <div className="container">
                    <div className="section-header">
                        <h2>how it works</h2>
                        <p>Learn More about how our website works</p>
                    </div>
                    <div className="works-content">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="single-how-works">
                                    <div className="single-how-works-icon">
                                        <i className="flaticon-lightbulb-idea"></i>
                                    </div>
                                    <h2><a href="#">choose <span> what to</span> do</a></h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt ut laboremagna aliqua.
                                    </p>
                                    {/* <button className="welcome-hero-btn how-work-btn" onClick="window.location.href='#'">
									read more
								</button> */}
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-how-works">
                                    <div className="single-how-works-icon">
                                        <i className="flaticon-networking"></i>
                                    </div>
                                    <h2><a href="#">find <span> what you want</span></a></h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt ut laboremagna aliqua.
                                    </p>
                                    {/* <button className="welcome-hero-btn how-work-btn" onClick="window.location.href='#'">
									read more
								</button> */}
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-how-works">
                                    <div className="single-how-works-icon">
                                        <i className="flaticon-location-on-road"></i>
                                    </div>
                                    <h2><a href="#">explore <span> amazing</span> place</a></h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt ut laboremagna aliqua.
                                    </p>
                                    {/* <button className="welcome-hero-btn how-work-btn" onClick="window.location.href='#'">
									read more
								</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <ChatBox/>
        </>
    )
}