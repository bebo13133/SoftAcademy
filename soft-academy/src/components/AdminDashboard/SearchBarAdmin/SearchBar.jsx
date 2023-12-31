import { useForm } from "../../Hooks/useForm"
import { useCourseContext } from "../../contexts/CourseContext"
import { useAuthContext } from "../../contexts/UserContext"

export const SearchBar = () => {

const {onSearchSubmitAdmin} = useAuthContext()
const {values,onSubmit,onChangeHandler}=useForm({
    searchTerm:"",
    searchCriteria:'',
},onSearchSubmitAdmin)



    return (
        <>
            <form  id="search-bar-admin" className="search-bar" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    name="searchTerm"
                    value={values.searchTerm}
                    onChange={onChangeHandler}
                />

                <select
                    name="searchCriteria"
                    value={values.searchCriteria}
                    onChange={onChangeHandler}
                >


                    <option value="all">All</option>
                    <option value="id">ID</option>
                    <option value="email">Email</option>
                    {/* Add more options based on your user object structure */}
                </select>
                <button type="submit" form="search-bar-admin">
                    Search
                </button>
            </form>
        </>

    )
}