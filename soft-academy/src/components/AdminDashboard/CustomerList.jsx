import { useEffect, useState } from 'react';

import { userServiceFactory } from "../Services/userService"
import { useAuthContext } from '../contexts/UserContext';
import { RowSection } from './RowSection';
import { Link } from 'react-router-dom';
import './adminDashboard.css'
import "../AdminDashboard/SearchBarAdmin/searchBarAdmin.css"
import { AdminSidebar } from './AdminSideBar';
import { SearchBar } from './SearchBarAdmin/SearchBar';
import { usePaginations } from '../Hooks/usePaginations';
import { Pagination } from '../Pagination/Pagination';



export const CustomerList = () => {
    const [usersInfo, setUsers] = useState([])
    const { token } = useAuthContext()
    // const { users } = useAuthContext()
  
    const userService = userServiceFactory(token)
    const resultsPerPage = 5;

const {getPaginationData}=usePaginations(resultsPerPage)
const{currentResult,currentPage,totalPages,paginate,setCurrentPage} = getPaginationData(usersInfo)


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

                {/* <section className="sidebar">
                    <AdminSidebar />
                </section> */}


                <section className="render-section">
                    <div className="customer-list">
                        <h2>User information</h2>
                       <SearchBar/>
                        {currentResult.length>0 ? currentResult.map(user => <RowSection key={user._id} {...user} />):(<h2 className="no-articles">No customer yet</h2>)}
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </section>

            </div>

        </>
    )


}