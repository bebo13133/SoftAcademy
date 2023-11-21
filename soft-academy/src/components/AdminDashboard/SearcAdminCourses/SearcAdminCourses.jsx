import { useEffect, useState } from "react";
import { useCourseContext } from "../../contexts/CourseContext";
import { AdminSidebar } from "../AdminSideBar"
import { SearchBarAdminCourses } from "./SearchBarAdminCourses"
import { useAuthContext } from "../../contexts/UserContext";
import { courseServiceFactory } from "../../Services/courseService";
import { RowSectionCourse } from "../RowSectionCourse";

export const SearchAdminCourses = () => {

    const { adminSearch } = useCourseContext()
// console.log("adminSearch",adminSearch)
    const [currentPage, setCurrentPage] = useState(1);
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


    const indexOfLastResult = currentPage * resultsPerPage;   //първа страница почва от едно по номера на резултатите които искаме да се показват 
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = courseInfo.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(courseInfo.length / resultsPerPage);



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
                        {currentResults && currentResults.map(user => <RowSectionCourse key={user._id} 
                        onDeleteClick={() => handleDelete(user._id)}
                         {...user} />)}
                    </div>
                    <ul className="pagination-admin">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                </section>

            </div>


        </>
    )

}