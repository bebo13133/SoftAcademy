import { useState } from "react"


export const usePaginations = (itemsPerPage) => {

    const [currentPage, setCurrentPage] = useState(1)

    const paginate = (pageNumber) => setCurrentPage(pageNumber) //определя се от index-a в случая ще почва от 1 или index+1 


    const getPaginationData = (data) => {
        const indexOfLastResult = currentPage * itemsPerPage // current page ще е index+1 или 1 ... * 5 items ще зададе до къде ще бъде slice получената дата 
        const indexOfFirstResult = indexOfLastResult - itemsPerPage // определя от къде да почне slice 
        const currentResult = data.slice(indexOfFirstResult, indexOfLastResult)// започва от 0 и реже първите 5 резултата  

        return {
            currentResult,
            totalPages: Math.ceil(data.length / itemsPerPage), // брой на страниците , делим дължината с броя който искаме да се виждат ан страница
            currentPage,
            paginate,
            setCurrentPage
        }

    }

    return { getPaginationData }


}