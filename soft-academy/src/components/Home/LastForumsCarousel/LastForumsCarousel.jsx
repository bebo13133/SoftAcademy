import Slider from "react-slick";
import { useEffect, useState } from "react";
import { forumServiceFactory } from "../../Services/forumService";
import { useService } from "../../Hooks/useService";
import { Fade,Zoom,Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import './LastForumsCarousel.css'
import { OneSliderComponent } from "./OneSliderComponent";


export const LastForumsCarousel = () => {
    const [forums, setForums] = useState([])
    const forumService = useService(forumServiceFactory)


    // const settings = {
    //     dots: true,
    //     fade: true,

    //     lazyLoad: true,
    //     infinite: true,
    //     speed: 200,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     initialSlide: 2


    // };

    useEffect(() => {
        forumService.getAll()
            .then(result => {

                setForums(result)
            })

    }, [])
    console.log(forums)
    return (

        <>
        
       <div className="blue-bar-h2">
        <h2>Forum posts</h2>
        <h3>Most popular post in our Forum </h3>
        </div>
            <div className="blue-bar">
            {/* <img src="/img/dots.png"/> */}
                <div className="slide-container">
                    <Zoom >
                        {forums && forums.map(forum => <OneSliderComponent key={forum._id} {...forum} />)}

                    </Zoom>
                </div>
            </div>;
        </>

    )

}