export const AllForums = () => {



    return (


        <>
            <div className="admin-dashboard">

                {/* <section className="sidebar">
    <AdminSidebar />
</section> */}


                <section className="render-section">

                    <div className="customer-list">
                        <h2>All courses</h2>
                        <SearchBarAdminCourses />
                        {currentResults && currentResults.map(user => <RowSectionForums key={user._id} onDeleteClick={() => handleDelete(user._id)} {...user} />)}
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