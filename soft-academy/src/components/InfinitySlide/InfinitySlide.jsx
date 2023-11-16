
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"


export const InfinitySlide=()=>{

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2500,
        autoplaySpeed: 1000,
        pauseOnHover: true
        
      };
      return(
        <div className="mainContainer-slide">
          {/* <h2>Auto Play</h2> */}
          <Slider {...settings}>
            <div className="container-slide">
              <img src="./img/DryAgingBagsBlack.webp" alt="DryAgingBags"/>
             
            </div>
            <div className="container-slide">
              <img src="./img/csmega-bg.webp" alt="csmega"/>
            
            </div>
            <div className="container-slide">
              <img src="./img/Logo_Software_University_(SoftUni)_-_blue.png" alt="Software_University"/>
            </div>
            <div className="container-slide">
              <img src="./img/top-logo-final-white-1.png" style={{background:"#000F4F"}} />
            </div>
            <div className="container-slide">
              <img src="./img/turkishsweets.jpg" alt="turkishsweets"/>
            </div>
           
          </Slider>
        </div>
      )
}