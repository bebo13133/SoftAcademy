import { useForm } from "../../../Hooks/useForm"

import { useForumContext } from "../../../contexts/ForumContext"




export const SearchBarAdminForum = () => {

    const { onSearchSubmitAdminForum } = useForumContext()
    const { values, onSubmit, onChangeHandler } = useForm({
        searchTerm: "",
        searchCriteria: '',
    }, onSearchSubmitAdminForum)



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
                    <option value="author">Author</option>
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