import { useEffect, useState } from "react"
import { usePaginations } from "../../Hooks/usePaginations"
import { forumServiceFactory } from "../../Services/forumService"
import { AdminSidebar } from "../AdminSideBar"
import { SearchBarProject } from "./SearchBarProject"
import { Pagination } from "../../Pagination/Pagination"
import { useForumContext } from "../../contexts/ForumContext"
import { RowSectionProject } from "./RowSectionProject"

export const SearchProjectPage = () => {

    const [projectInfo, setProjectInfo] = useState([])

    const { searchProjects } = useForumContext()
    // const { onDeleteForumAdmin } = useForumContext()
    const forumService = forumServiceFactory()

    const onDeleteProject = async (projectId) => {
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

        setProjectInfo(searchProjects)



    }, [searchProjects])

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
                        <SearchBarProject />
                        {currentResult.length > 0 ? currentResult.map(project => <RowSectionProject key={project._id} onDeleteClick={() => handleDelete(project._id)} {...project} />) : (<h2 className="no-articles">No courses yet</h2>)}
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </section>

            </div>
        </>
    )


}