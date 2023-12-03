import { useForm } from '../../Hooks/useForm'
import { useForumContext } from '../../contexts/ForumContext'
import { ForumStudents } from '../ForumStudents'
import { SearchPageForum } from './SearcPagrForum'
import './searchBarForum.css'



export const SearchBarForum=()=>{

    const {onSearchForms,forumSearch}=useForumContext()


const {onChangeHandler,values,onSubmit} = useForm({
    searchTerm:'',
    searchCriteria:"",
},onSearchForms)





    return (
        <>
           <form  id="search-bar-admin" className="search-bar-forum" onSubmit={onSubmit}>
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
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    {/* Add more options based on your user object structure */}
                </select>
                <button type="submit" form="search-bar-admin">
                    Search
                </button>
            </form>
            {/* {forumSearch.length>0 && <SearchPageForum forumSearch={forumSearch}/>} */}
        </>
    )


}