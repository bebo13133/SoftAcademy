// import { OneCourse } from "../CatalogCourses/OneCourse"
import { WaveAnimation } from "../tools/WaveAnimation"
import { SearchField } from "./SearchField"
import { Link, useNavigate } from "react-router-dom"
import { useCourseContext } from "../contexts/CourseContext"
import HomeOneCourse from "../Home/HomeOneCourse"
import { Pagination } from "../Pagination/Pagination"
import { usePaginations } from "../Hooks/usePaginations"
import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import { WelcomeScreen } from "../Home/WelcomeScreen/WelcomeScreen"
import { ListTopics } from "../Home/ListTopics/ListTopics"
import { IsLoading } from "../IsLoading/IsLoading"

export const SearchPage = () => {
    const [isLoading, setIsloading] = useState(true)
    const [courses, setCourses] = useState([])
    const { searchResult } = useCourseContext()
    const navigate=useNavigate()


   const toggleShowMore = ()=>{
    navigate("/")
   }


    useEffect(() => {

        setCourses(searchResult)
setIsloading(false)
    }, [searchResult])

    const resultsPerPage = 3;

    const { getPaginationData } = usePaginations(resultsPerPage)

    const { paginate, totalPages, currentPage, currentResult, setCurrentPage } = getPaginationData(courses)
    return (
        <>

            {isLoading ? <IsLoading /> : (<>
                <WelcomeScreen />
                <ListTopics />

                <br />
                <br />
                <section id="works" className="works">
                    <div className="container">
                        <div className="section-header">
                            <h2>Result from search</h2>
                            {/* <p>Learn More about courses our website </p> */}
                        </div>
                        <div className="works-content">
                            <div className="row">
                                {/* one course */}
                                {currentResult.length > 0 ? currentResult.map(x => <HomeOneCourse key={x._id} {...x} />) : (<h2 className="no-articles">No results</h2>)}
                            </div>
                            <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                        </div>
                    </div>
                    {/* <Footer/> */}
                    <button className="show-more-button-details" style={{float:"right", marginRight:"240px", fontSize:"22px"}} onClick={toggleShowMore}>Back home</button>
                </section>
            </>
            )}



        </>
    )
}