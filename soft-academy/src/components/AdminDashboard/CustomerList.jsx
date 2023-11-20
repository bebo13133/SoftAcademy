import { useEffect, useState } from 'react';

import { userServiceFactory } from "../Services/userService"
import { useAuthContext } from '../contexts/UserContext';
import { RowSection } from './RowSection';
import { Link } from 'react-router-dom';
import './adminDashboard.css'
import "../AdminDashboard/SearchBarAdmin/searchBarAdmin.css"
import { AdminSidebar } from './AdminSideBar';
import { SearchBar } from './SearchBarAdmin/SearchBar';



export const CustomerList = () => {
    const [usersInfo, setUsers] = useState([])
    const { token } = useAuthContext()
    // const { users } = useAuthContext()
    const [currentPage, setCurrentPage] = useState(1);
    const userService = userServiceFactory(token)
    const resultsPerPage = 5;

    const indexOfLastResult = currentPage * resultsPerPage;   //първа страница почва от едно по номера на резултатите които искаме да се показват 
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = usersInfo.slice(indexOfFirstResult, indexOfLastResult);

    const totalPages = Math.ceil(usersInfo.length / resultsPerPage);

    useEffect(() => {
        userService.getAll()
            .then(result => {

                setUsers(result)
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
                        <h2>User information</h2>
                       <SearchBar/>
                        {currentResults && currentResults.map(user => <RowSection key={user._id} {...user} />)}
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