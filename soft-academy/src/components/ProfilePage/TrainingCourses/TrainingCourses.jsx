import { useEffect, useState } from "react"
import { IsLoading } from "../../IsLoading/IsLoading"
import { ProfileSidebar } from "../ProfileSidebar"
import { Pagination } from "@mui/material"
import { usePaginations } from "../../Hooks/usePaginations"

export const TrainingCourses = () => {
    const [isLoading, setIsLoading] = useState(false)


    const resultPerPage = 3
    const { getPaginationData } = usePaginations(resultPerPage)
    // const { totalPages, currentPage, currentResult, paginate } = getPaginationData()

    useEffect(() => {

        setIsLoading(false)
    }, [])


    return (
        <>
            <ProfileSidebar />
            {isLoading ? <IsLoading /> : (
                <section id="explore" className="explore" style={{ height: "376px" }}>

                    <div className="container">
                        <div className="section-header">
                            <h2>Courses</h2>
                            <p>Explore New place, food, culture around the world and many more</p>
                        </div>
                        <div className="explore-content">
                            <div className="row">


                                {/* {favCourses.length > 0 ? favCourses.map(course => <OneFavoriteCourses key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>} */}

                            </div>
                            {/* <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} /> */}

                        </div>
                    </div>

                </section>

            )}
        </>
    )
}