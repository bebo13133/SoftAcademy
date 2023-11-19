import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/UserContext';
import './adminDashboard.css'
import { AdminSidebar } from './AdminSideBar';
import { courseServiceFactory } from "../Services/courseService";
import { RowSectionCourse } from './RowSectionCourse';


export const AllCourses = () => {

    const{token}=useAuthContext()
    const [courseInfo, setCourseInfo] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const courseService = courseServiceFactory(token)

    const resultsPerPage = 5;


    const indexOfLastResult = currentPage * resultsPerPage;   //първа страница почва от едно по номера на резултатите които искаме да се показват 
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = courseInfo.slice(indexOfFirstResult, indexOfLastResult);

    const totalPages = Math.ceil(courseInfo.length / resultsPerPage);

    useEffect(() => {

        courseService.getAll()
            .then(result => {
                setCourseInfo(result)
            })
            .catch(error => {
                console.log(error.message || error)
            })
    }, [])
        
 


    return (
        <>
            <div className="admin-dashboard">

                <section className="sidebar">
                    <AdminSidebar />
                </section>


                <section className="render-section">
                    <div className="customer-list">
                        <h2>All courses</h2>

                        {currentResults && currentResults.map(user => <RowSectionCourse key={user._id} {...user} />)}
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