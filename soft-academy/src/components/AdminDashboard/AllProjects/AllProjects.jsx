import { useEffect, useState } from "react";
import { useForumContext } from "../../contexts/ForumContext";
import { usePaginations } from "../../Hooks/usePaginations";

import { Pagination } from "../../Pagination/Pagination";
import '../../AdminDashboard/adminDashboard.css'
import { RowSectionProject } from "./RowSectionProject";
import { forumServiceFactory } from "../../Services/forumService";
import { SearchBarAdminForum } from "../AllForums/SearchBarForum/SearchBarForum";
import { AdminSidebar } from "../AdminSideBar";


export const AllProjects = () => {
    const [projectInfo, setProjectInfo] = useState([])
    // const [currentPage, setCurrentPage] = useState(1);

    // const { onDeleteForumAdmin } = useForumContext()
    const forumService = forumServiceFactory()

    const onDeleteProject=async(projectId) => {
        try {
            const deletePost = await forumService.deleteProject(projectId)
         

            navigate("/admin/projects")

        } catch (err) {
          console.log(err.message || err)
        }

    }



    const resultsPerPage = 5;
    const { getPaginationData } = usePaginations(resultsPerPage)


    const { paginate, totalPages, currentPage, currentResult, setCurrentPage } = getPaginationData(projectInfo)



    useEffect(() => {
        forumService.getAllProjects()
            .then(result => {
          
                setProjectInfo(result)
            })
            .catch(error => {
                console.log(error.message || error)
            })

    }, [])

    const handleDelete = async (forumId) => {
        await onDeleteProject(forumId)
        const projects = await forumService.getAllProjects()
        setProjectInfo(projects)
    }
    return (

        <>
            <div className="admin-dashboard">

                <section className="sidebar">
    <AdminSidebar />
</section>


                <section className="render-section">

                    <div className="customer-list">
                        <h2>All Projects</h2>
                        <SearchBarAdminForum />
                        {currentResult.length > 0 ? currentResult.map(project => <RowSectionProject key={project._id} onDeleteClick={() => handleDelete(project._id)} {...project} />) : (<h2 className="no-articles">No courses yet</h2>)}
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </section>

            </div>
        </>
    )

}