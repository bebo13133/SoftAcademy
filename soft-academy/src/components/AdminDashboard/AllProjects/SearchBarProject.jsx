import { useForm } from "../../Hooks/useForm"
import { useForumContext } from "../../contexts/ForumContext"

export const SearchBarProject =()=>{

const {onSearchProject} =useForumContext()


    const { values, onSubmit, onChangeHandler } = useForm({
        searchTerm: "",
        searchCriteria: '',
    }, onSearchProject)


return (
    <>
    <form id="search-bar-admin" className="search-bar" onSubmit={onSubmit}>
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
            <option value="title">Name</option>
            <option value="website">Website</option>
            
            <option value="youtube">Youtube</option>
            <option value="id">ID</option>
 
            {/* Add more options based on your user object structure */}
        </select>
        <button type="submit" form="search-bar-admin">
            Search
        </button>
    </form>
</>


)

}