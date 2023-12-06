import { ProfileSidebar } from "./ProfileSidebar";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../contexts/CourseContext";
import { useAuthContext } from "../contexts/UserContext";
import * as bookmarkService from "../Services/bookmarkService"
import '../CatalogCourses/bookMark.css'
import { OneFavoriteCourses } from "./OneFavoriteCourses";
import { IsLoading } from "../IsLoading/IsLoading"
import './FavoriteCourses.css'
import { Pagination } from "../Pagination/Pagination";
import { usePaginations } from "../Hooks/usePaginations";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";

export const FavoriteCourses = () => {
    const { userId } = useAuthContext()
    const { courses } = useContext(CourseContext)
    const [favorites, setFavorites] = useState([])
    const [favCourses, setFavCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
const location=useLocation()


    const resultPerPage = 3
    const { getPaginationData } = usePaginations(resultPerPage)
    const { totalPages, currentPage, currentResult, paginate,setCurrentPage } = getPaginationData(favCourses)




    useEffect(() => {

        bookmarkService.getAllMarks()

            .then(response => {

                const bookMarkCourse = (response.filter(course => course.userId === userId));


                setFavorites(bookMarkCourse)


            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
    }, []);


    useEffect(() => {
        const favoriteCourseIds = favorites.map((like) => like.courseId) // обръщам да остана само courseId-тата

        const userLikedCourses = courses.filter((course) => {
            return favoriteCourseIds.includes(course._id)                    // филтрирам ги да останат само тези курсове които са харесани от този user

        });

        setFavCourses(userLikedCourses)
        setIsLoading(false)

    }, [courses, favorites]);


    return (
        <>

            {isLoading && <IsLoading />}
            <ProfileSidebar />
            <Fade delay="50" duration="4000" triggerOnce='true'>

            <section id="explore" className="explore" style={{ height: "420px" }}>

                <div className="container">
                <div className="section-header">
                            <h2 style={{color: "rgb(2 93 139)", textShadow: "0 4px 8px rgb(109 20 37)"}}>Beloved Courses</h2>
                            <p style={{fontSize:"22px", color:"#fffefd"}}>Explore your Favorites and Elevate your learning Journey</p>
                        </div>
                    <div className="explore-content">
                        <div className="row">

                    
                            {currentResult.length > 0 ? currentResult.map(course => <OneFavoriteCourses key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}

                        </div>
                        <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                    </div>
                </div>

            </section>
            </Fade>
        </>

    )
}