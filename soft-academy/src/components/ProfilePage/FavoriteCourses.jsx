import { ProfileSidebar } from "./ProfileSidebar";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../contexts/CourseContext";
import { useAuthContext } from "../contexts/UserContext";
import * as bookmarkService from "../Services/bookmarkService"
import '../CatalogCourses/bookMark.css'
import { OneFavoriteCourses } from "./OneFavoriteCourses";

export const FavoriteCourses = () => {
    const { userId } = useAuthContext()
    const { courses } = useContext(CourseContext)
    const [favorites, setFavorites] = useState([])
    const [favCourses, setFavCourses] = useState([])


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

}, [courses, favorites]);

    console.log("userLikedCourses", favCourses);






    return (
        <>


            <ProfileSidebar />

            <section id="explore" className="explore" style={{height: "376px"}}>
                <div className="container">
                    <div className="section-header">
                        <h2>Courses</h2>
                        <p>Explore New place, food, culture around the world and many more</p>
                    </div>
                    <div className="explore-content">
                        <div className="row">

                            {favCourses.length > 0 ? favCourses.map(course => <OneFavoriteCourses key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}

                        </div>

                    </div>
                </div>

            </section>
        </>

    )
}