import { useLocation, useNavigate } from 'react-router-dom'
import '../Hooks/paginations.css'
import { useEffect } from 'react'


export const Pagination = ({
    totalPages,
    paginate,
    currentPage,setCurrentPage }) => {

        const location=useLocation()
     

const navigate=useNavigate()
useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // Обект query параметри в URL-a. 
    const pageParam = urlParams.get('page'); // взимам стойноста на page  пример:/training-courses?page=2 - страница 2
    const currentPageFromQuery = parseInt(pageParam, 10) || 1; //преобразувам стойността в числа((pageParam, 10)) ако стойността е null го приравнявам на 1 

    if (currentPage !== currentPageFromQuery) { // ако текущата страница не съвпада сетва сттойността на новаат , така сменям номерата в pagination
        setCurrentPage(currentPageFromQuery);
    }
}, [location.search, currentPage, setCurrentPage]);




    return (
        <>
            <ul className="pagination-admin">
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} onClick={() => {
                        paginate(index + 1);
                        setCurrentPage(index + 1);
                        navigate(`${location.pathname}?page=${index + 1}`, //добавям номер страница съгласно query парамтрите
                        // { replace: true }
                        );
                    }
                    } className={currentPage === index + 1 ? "active" : ""}>
                        {index + 1}
                    </li>
                ))}
            </ul>
        </>
    )
}