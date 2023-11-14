import Slider from "react-slick";

import './LastForumsCarousel.css'
import { OneSliderComponent } from "./OneSliderComponent";
export const LastForumsCarousel = () => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // initialSlide: 2,

    };

    

    return (

        <>
            <div className="blue-bar">
                <div>
                    <h2>Fade</h2>
                    <Slider {...settings}>
                     
                       <OneSliderComponent/>
                      
                    </Slider>
                </div>
            </div>;
        </>

    )

}