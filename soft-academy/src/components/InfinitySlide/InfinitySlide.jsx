
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export const InfinitySlide=()=>{

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };
      return(
        <div className="mainContainer-slide">
          {/* <h2>Auto Play</h2> */}
          <Slider {...settings}>
            <div className="container-slide">
              <img src="https://www.finoit.com/wp-content/uploads/2022/11/future-of-java-programming-language.jpg" />
            </div>
            <div className="container-slide">
              <img src="https://ubiqum.com/assets/uploads/2019/07/code-coder-coding-270348.jpg" />
            </div>
            <div className="container-slide">
              <img src="https://miro.medium.com/v2/resize:fit:1400/1*3OWWk9BUargTyvFGQpBsOA.png" />
            </div>
            <div className="container-slide">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhGKnkEpTuSXmTqUnvWi-7Od6IdTuJNcE2hs0K9t093X2I4zqvsht6CyeM3Dci85VC8fs&usqp=CAU" />
            </div>
            <div className="container-slide">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXU-2EuKjBDTyzUJF2Ou6koEkC05aGtG7RENCnUK60OZ7muOVDd2wQUReZoi4w8bbMtMs&usqp=CAU" />
            </div>
            <div className="container-slide">
              <img src="http://recruiters-zone.com/static/media/BRS_Ventures.0722bfe22318cd3f3f5d.jpg" />
            </div>
          </Slider>
        </div>
      )
}