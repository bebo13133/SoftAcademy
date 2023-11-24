import { useState } from 'react'
import '../../AdminDashboard/adminDashboard.css'
import { useAuthContext } from '../../contexts/UserContext'
import { AdminSidebar } from '../AdminSideBar'
import { SearchBar } from './SearchBar'
import "./searchBarAdmin.css"
import { RowSection } from '../RowSection'
import { usePaginations } from '../../Hooks/usePaginations'
import { Pagination } from '../../Pagination/Pagination'


export const SearchBarPage = () => {
// const [usersInfo,setUsersInfo]=useState([])


const{searchResult}=useAuthContext()

    const resultsPerPage = 5;
    const { getPaginationData } = usePaginations(resultsPerPage)

    const {paginate,totalPages,currentPage,currentResult,setCurrentPage} = getPaginationData(forumsInfo)



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
                        {currentResult.length>0 ? (currentResult.map(user => <RowSection key={user._id} {...user} />)):(<h2 className="no-articles">No results</h2>)}
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                </section>

            </div>
        </>
    )
}