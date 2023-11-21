import { useEffect, useState } from "react";

import { useForumContext } from "../../../contexts/ForumContext";
import { AdminSidebar } from "../../AdminSideBar";
import { SearchBarAdminForum } from "./SearchBarForum";
import { RowSectionForum } from "../RowSectionForum";
import { forumServiceFactory } from "../../../Services/forumService";
import { useAuthContext } from "../../../contexts/UserContext";

export const SearchAdminForum = () => {
    const [forumsInfo, setForumsInfo] = useState([])
  
    const { forumSearch } = useForumContext()

    const [currentPage, setCurrentPage] = useState(1);
    const { onDeleteForumAdmin } = useForumContext()
   
    const { token } = useAuthContext()
    const forumService = forumServiceFactory(token)

    useEffect(() => {
        setForumsInfo(forumSearch)

    }, [])


    const handleDelete = async (forumId) => {
        await onDeleteForumAdmin(forumId)
        const forums = await forumService.getAll()
        setForumsInfo(forums)
    }


    const resultsPerPage = 5;


    const indexOfLastResult = currentPage * resultsPerPage;   //първа страница почва от едно по номера на резултатите които искаме да се показват 
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = forumsInfo.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(forumsInfo.length / resultsPerPage);




    return (
        <>
            <div className="admin-dashboard">

                <section className="sidebar">
                    <AdminSidebar />
                </section>

                <section className="render-section">

                    <div className="customer-list">
                        <h2>All courses</h2>
                        <SearchBarAdminForum/>
                        {currentResults && currentResults.map(forum => <RowSectionForum key={forum._id} onDeleteClick={() => handleDelete(forum._id)} {...forum} />)}
                    </div>
                    <ul className="pagination-admin">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

        </>
    )
}