import Slider from "react-slick";

export const LastForumsCarousel = () => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,

      };

    return (

        <>
            <div>
                <h2>Fade</h2>
                <Slider {...settings}>
                    <div>
                        <img src="https://capitalizemytitle.com/wp-content/uploads/2020/08/Has-vs.-Have.png" />
                    </div>
                    <div>
                        <img src="https://capitalizemytitle.com/wp-content/uploads/2020/08/Has-vs.-Have.png" />
                    </div>
                    <div>
                        <img src={"baseUrl" + "/abstract03.jpg"} />
                    </div>
                    <div>
                        <img src={"baseUrl" + "/abstract04.jpg"} />
                    </div>
                </Slider>
            </div>
        </>

    )

}