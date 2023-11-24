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

export const FavoriteCourses = () => {
    const { userId } = useAuthContext()
    const { courses } = useContext(CourseContext)
    const [favorites, setFavorites] = useState([])
    const [favCourses, setFavCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)



    const resultPerPage = 3
    const { getPaginationData } = usePaginations(resultPerPage)
    const { totalPages, currentPage, currentResult, paginate } = getPaginationData(favCourses)




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

            <section id="explore" className="explore" style={{ height: "376px" }}>

                <div className="container">
                    <div className="section-header">
                        <h2>Courses</h2>
                        <p>Explore New place, food, culture around the world and many more</p>
                    </div>
                    <div className="explore-content">
                        <div className="row">

                            {/* {isLoading && <IsLoading /> } */}
                            {currentResult.length > 0 ? currentResult.map(course => <OneFavoriteCourses key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}

                        </div>
                        <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} />

                    </div>
                </div>

            </section>
        </>

    )
}