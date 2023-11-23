import '../Hooks/paginations.css'


export const Pagination = ({
    totalPages,
    paginate,
    currentPage, }) => {


    return (
        <>
            <ul className="pagination-admin">
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                        {index + 1}
                    </li>
                ))}
            </ul>
        </>
    )
}