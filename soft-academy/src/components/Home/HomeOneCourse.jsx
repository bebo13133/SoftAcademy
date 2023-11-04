import { Link } from "react-router-dom"

export const HomeOneCourse = ({
    imageUrl,
    imageUrl2,
    description,
courseName
}) => {

    return (
        <>
            <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                    <div className="single-how-works-icon">
                    <img className="home-top-lang" src={imageUrl ? imageUrl : imageUrl2} />
                    </div>
                    <h2><Link to={"/catalog"}>Learn <span> {courseName}</span> language</Link></h2>
                    <p>
                        {description}
                    </p>
                    {/* <button className="welcome-hero-btn how-work-btn" onClick="window.location.href='#'">
									read more
								</button> */}
                </div>
            </div>

        </>
    )
}