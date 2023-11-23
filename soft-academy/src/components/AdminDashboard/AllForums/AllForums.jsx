import { useEffect, useState } from "react";
import { forumServiceFactory } from "../../Services/forumService";
import { RowSectionForum } from "./RowSectionForum";
import { SearchBarAdminCourses } from "../SearcAdminCourses/SearchBarAdminCourses";
import '../../AdminDashboard/adminDashboard.css'
import { useForumContext } from "../../contexts/ForumContext";
import { SearchBarAdminForum } from "./SearchBarForum/SearchBarForum";

import { usePaginations } from "../../Hooks/usePaginations";


export const AllForums = () => {
    const [forumsInfo, setForumsInfo] = useState([])
    // const [currentPage, setCurrentPage] = useState(1);

    const { onDeleteForumAdmin } = useForumContext()

    const forumService = forumServiceFactory()

    const resultsPerPage = 5;
    const { getPaginationData } = usePaginations(resultsPerPage)


const {paginate,totalPages,currentPage,currentResult} = getPaginationData(forumsInfo)



    useEffect(() => {
        forumService.getAll()
            .then(result => {
                setForumsInfo(result)
            })
            .catch(error => {
                console.log(error.message || error)
            })

    }, [])

    const handleDelete = async (forumId) => {
        await onDeleteForumAdmin(forumId)
        const forums = await forumService.getAll()
        setForumsInfo(forums)
    }
    return (

        <>
            <div className="admin-dashboard">

                {/* <section className="sidebar">
    <AdminSidebar />
</section> */}


                <section className="render-section">

                    <div className="customer-list">
                        <h2>All Forums</h2>
                        <SearchBarAdminForum />
                        {currentResult.length > 0 ? currentResult.map(forum => <RowSectionForum key={forum._id} onDeleteClick={() => handleDelete(forum._id)} {...forum} />) : (<h2 className="no-articles">No courses yet</h2>)}
                    </div>
                    <ul className="pagination-admin">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                </section>

            </div>
        </>
    )
}