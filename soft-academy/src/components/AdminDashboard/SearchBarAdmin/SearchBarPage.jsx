import { useState } from 'react'
import '../../AdminDashboard/adminDashboard.css'
import { useAuthContext } from '../../contexts/UserContext'
import { AdminSidebar } from '../AdminSideBar'
import { SearchBar } from './SearchBar'
import "./searchBarAdmin.css"
import { RowSection } from '../RowSection'

export const SearchBarPage = () => {
// const [usersInfo,setUsersInfo]=useState([])
const [currentPage, setCurrentPage] = useState(1);

const{searchResult}=useAuthContext()

    const resultsPerPage = 5;

    const indexOfLastResult = currentPage * resultsPerPage;   //първа страница почва от едно по номера на резултатите които искаме да се показват 
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResult.slice(indexOfFirstResult, indexOfLastResult);

    const totalPages = Math.ceil(searchResult.length / resultsPerPage);



    return (
        <>
            <div className="admin-dashboard">

                <section className="sidebar">
                    <AdminSidebar />
                </section>


                <section className="render-section">
                    <div className="customer-list">
                        <h2>User information</h2>
                        <SearchBar />
                        {currentResults.length>0 ? (currentResults.map(user => <RowSection key={user._id} {...user} />)):(<h2 className="no-articles">No results</h2>)}
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