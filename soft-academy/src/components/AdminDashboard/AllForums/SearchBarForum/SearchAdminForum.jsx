import { useEffect, useState } from "react";

import { useForumContext } from "../../../contexts/ForumContext";
import { AdminSidebar } from "../../AdminSideBar";
import { SearchBarAdminForum } from "./SearchBarForum";
import { RowSectionForum } from "../RowSectionForum";
import { forumServiceFactory } from "../../../Services/forumService";
import { useAuthContext } from "../../../contexts/UserContext";
import { Pagination } from "../../../Pagination/Pagination";
import { usePaginations } from "../../../Hooks/usePaginations";

export const SearchAdminForum = () => {
    const { forumSearch } = useForumContext()


    const [forumsInfo, setForumsInfo] = useState([])

 
    const { onDeleteForumAdmin } = useForumContext()
   
    const { token } = useAuthContext()
    const forumService = forumServiceFactory(token)

    useEffect(() => {
        setForumsInfo(forumSearch)

    }, [forumSearch])


    const handleDelete = async (forumId) => {
        await onDeleteForumAdmin(forumId)
        const forums = await forumService.getAll()
        setForumsInfo(forums)
    }


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
                        <h2>All courses</h2>
                        <SearchBarAdminForum/>
                        <h2 className="no-articles" style={{ marginBottom: "0px", color: "rgb(189, 104, 19)", textShadow: "0 4px 8px rgb(6 85 255 / 36%)" }}>Find results: {forumsInfo.length}</h2>
                        {currentResult.length > 0 ? currentResult.map(forum => <RowSectionForum key={forum._id} onDeleteClick={() => handleDelete(forum._id)} {...forum} />)
                        :
                        (<h2 className="no-articles">No forums yet</h2>)
                        }
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </section>
            </div>

        </>
    )
}