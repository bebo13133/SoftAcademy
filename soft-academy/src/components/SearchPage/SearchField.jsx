import { useCourseContext } from "../contexts/CourseContext"
import { SearchPage } from "./SearchPage"

export const SearchField = () => {
    const [searchResult, setSearchResult] = useState([])
    const { courses } = useCourseContext


    const searchHandler = () => {

    }
    const onSearchSubmit = (e) => {
        e.preventDefault()
        console.log("hi")
    }


    return (
        <>



            <div className="welcome-hero-serch-box">
                <div className="welcome-hero-form">
                    <div className="single-welcome-hero-form">
                        <h3>Find your Course :</h3>
                        <form action="index.html">
                            <input type="text" placeholder="" onChange={searchHandler} />
                        </form>
                        {/* <div className="welcome-hero-form-icon">
                    <i className="flaticon-list-with-dots"></i>
                </div> */}
                    </div>
                </div>
                <div className="welcome-hero-serch">
                    <button className="welcome-hero-btn" onClick={(e) => onSearchSubmit(e)}>
                        search  <i data-feather="search"></i>
                    </button>
                </div>
            </div>





            {/* <SearchPage/> */}
        </>
    )
}