import { useEffect, useState } from "react";
import { forumServiceFactory } from "../../Services/forumService";
import { RowSectionForum } from "./RowSectionForum";
import { SearchBarAdminCourses } from "../SearcAdminCourses/SearchBarAdminCourses";
import '../../AdminDashboard/adminDashboard.css'
import { useForumContext } from "../../contexts/ForumContext";
import { SearchBarAdminForum } from "./SearchBarForum/SearchBarForum";

import { usePaginations } from "../../Hooks/usePaginations";
import { Pagination } from "../../Pagination/Pagination";


export const AllForums = () => {
    const [forumsInfo, setForumsInfo] = useState([])
    // const [currentPage, setCurrentPage] = useState(1);

    const { onDeleteForumAdmin } = useForumContext()

    const forumService = forumServiceFactory()

    const resultsPerPage = 5;
    const { getPaginationData } = usePaginations(resultsPerPage)


const {paginate,totalPages,currentPage,currentResult,setCurrentPage} = getPaginationData(forumsInfo)



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
                   <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </section>

            </div>
        </>
    )
}