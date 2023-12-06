import { useEffect, useState } from "react";
import { useCourseContext } from "../../contexts/CourseContext";
import { AdminSidebar } from "../AdminSideBar"
import { SearchBarAdminCourses } from "./SearchBarAdminCourses"
import { useAuthContext } from "../../contexts/UserContext";
import { courseServiceFactory } from "../../Services/courseService";
import { RowSectionCourse } from "../RowSectionCourse";
import { Pagination } from "../../Pagination/Pagination";
import { usePaginations } from "../../Hooks/usePaginations";

export const SearchAdminCourses = () => {

    const { adminSearch } = useCourseContext()
// console.log("adminSearch",adminSearch)
    const { onDeleteClickAdmin } = useCourseContext()
    const [courseInfo, setCourseInfo] = useState([])
    const { token } = useAuthContext()
    const courseService = courseServiceFactory(token)


    useEffect(()=>{
        setCourseInfo(adminSearch)

    },[adminSearch])
  

    const handleDelete=async(courseId)=>{
        await onDeleteClickAdmin(courseId)
        const courses = await courseService.getAll()
        setCourseInfo(courses)
     }


    const resultsPerPage = 5;

    const { getPaginationData } = usePaginations(resultsPerPage)

    const {paginate,totalPages,currentPage,currentResult,setCurrentPage} = getPaginationData(courseInfo)




    return (
        <>
            <div className="admin-dashboard">

                <section className="sidebar">
                    <AdminSidebar />
                </section>

                <section className="render-section">
                    <div className="customer-list">
                        <h2>All courses</h2>
                        <SearchBarAdminCourses />
                        <h2 className="no-articles" style={{ marginBottom: "0px", color: "rgb(189, 104, 19)", textShadow: "0 4px 8px rgb(6 85 255 / 36%)" }}>Find results: {courseInfo.length}</h2>

                        {currentResult && currentResult.map(user => <RowSectionCourse key={user._id} 
                        onDeleteClick={() => handleDelete(user._id)}
                         {...user} />)}
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                </section>

            </div>


        </>
    )

}