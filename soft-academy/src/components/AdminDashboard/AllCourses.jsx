import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/UserContext';
import './adminDashboard.css'
import { AdminSidebar } from './AdminSideBar';
import { courseServiceFactory } from "../Services/courseService";
import { RowSectionCourse } from './RowSectionCourse';
import { useCourseContext } from '../contexts/CourseContext';
import "../AdminDashboard/SearchBarAdmin/searchBarAdmin.css"
import { SearchBarAdminCourses } from './SearcAdminCourses/SearchBarAdminCourses';
import { usePaginations } from '../Hooks/usePaginations';
import { Pagination } from '../Pagination/Pagination';


export const AllCourses = () => {

    const { token } = useAuthContext()
    const [courseInfo, setCourseInfo] = useState([])
   
    const courseService = courseServiceFactory(token)
    const { onDeleteClickAdmin } = useCourseContext()

    const resultsPerPage = 5;

    const { getPaginationData } = usePaginations(resultsPerPage)

    const {currentResult,currentPage,totalPages,paginate,setCurrentPage}=getPaginationData(courseInfo)



    useEffect(() => {

        courseService.getAll()
            .then(result => {
                setCourseInfo(result)
            })
            .catch(error => {
                console.log(error.message || error)
            })
    }, [])

    const handleDelete = async (courseId) => {
        await onDeleteClickAdmin(courseId)
        const courses = await courseService.getAll()
        setCourseInfo(courses)
    }


    return (
        <>
            <div className="admin-dashboard">

                {/* <section className="sidebar">
                    <AdminSidebar />
                </section> */}


                <section className="render-section">

                    <div className="customer-list">
                        <h2>All courses</h2>
                        <SearchBarAdminCourses />
                        {currentResult.length > 0 ? currentResult.map(user => <RowSectionCourse key={user._id} onDeleteClick={() => handleDelete(user._id)} {...user} />)
                            : (<h2 className="no-articles">No courses yet</h2>)}
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </section>

            </div>


        </>

    )

}