import { Link } from "react-router-dom"

export const OneCourse = ({
    imageUrl,
    description,
    price,
    courseName,
    imageUrl2,
    date,
    firstName,
    lastName,
    _id,
    lectorImage
}) => {

    return (
        <>
            <div className=" col-md-4 col-sm-6">
                <div className="single-explore-item">
                    <div className="single-explore-img">
                        <img src={imageUrl ? imageUrl : imageUrl2} alt="explore image" />
                        <div className="single-explore-img-info">
                            {/* <button onClick="window.location.href='#'">best rated</button> */}
                            <div className="single-explore-image-icon-box">
                                <ul>
                                    <li>
                                        <div className="single-explore-image-icon">
                                            <i className="fa fa-arrows-alt"></i>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="single-explore-image-icon">
                                            <i className="fa fa-bookmark-o"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="single-explore-txt bg-theme-1">
                        <h2><a href="#">{courseName}</a></h2>
                        <p className="explore-rating-price">

                            <a href="#"> 10 Likes</a>
                            <span className="explore-price-box">
                                Price &ensp;
                                <span className="explore-price">{price}$</span>
                            </span>
                            <a href="#">Start date : {date}</a>
                        </p>
                        <div className="explore-person">
                            <div className="row">
                                <div className="col-sm-2">
                                    <div className="explore-person-img">
                                        <a href="#">
                                            <img src={lectorImage} alt="explore person" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-10">
                                    <p>{firstName} {lastName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="explore-open-close-part">
                            <div className="row">
                                <div className="col-sm-5">
                                <Link to={`/catalog/${_id}`}><button className="close-btn" >Read more...</button></Link>
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}