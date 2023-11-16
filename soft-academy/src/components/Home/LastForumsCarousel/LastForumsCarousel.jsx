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


    useEffect(() => {
        forumService.getAll()
            .then(result => {

                setForums(result)
            })

    }, [])
   
    return (

        <>
        
       <div className="blue-bar-h2">
        <h2>visit the Forum </h2>
        <h3>Most popular posts in our Forum </h3>
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