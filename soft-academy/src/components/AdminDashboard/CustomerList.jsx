import { useEffect, useState } from 'react';

import { useAuthContext } from '../contexts/UserContext';
import { RowSection } from './RowSection';
import { Link } from 'react-router-dom';
import './adminDashboard.css'



export const CustomerList = () => {
    const [usersInfo, setUsers] = useState([])
    const { users } = useAuthContext()
    const [currentPage, setCurrentPage] = useState(1);

    const resultsPerPage = 5;

    const indexOfLastResult = currentPage * resultsPerPage;   //първа страница почва от едно по номера на резултатите които искаме да се показват 
    const indexOfFirstResult = indexOfLastResult - resultsPerPage; 
    const currentResults = usersInfo.slice(indexOfFirstResult, indexOfLastResult);

    const totalPages = Math.ceil(usersInfo.length / resultsPerPage);

    useEffect(() => {
        setUsers(users)
    }, [users])


    return (
        <>
            <div className="admin-dashboard">

                <section className="sidebar">
                    <div className="customers">


                        <Link to="/customers-list"><h2>Customers</h2></Link>
                    </div>
                    <div className="admin-chat">


                        <Link to="/admin-chat"><h2>Admin Chat</h2></Link>

                    </div>
                </section>


                <section className="render-section">
                    <div className="customer-list">
                                 <h2>User information</h2>   

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