

import './searchBarForum.css'



export const SearchBarForum=()=>{

    return (
        <>
           <form  id="search-bar-admin" className="search-bar-forum" onSubmit="{onSubmit}">
                <input
                    type="text"
                    placeholder="Search..."
                    name="searchTerm"
                    value="{values.searchTerm}"
                    onChange="{onChangeHandler}"
                />

                <select
                    name="searchCriteria"
                    value="{values.searchCriteria}"
                    onChange="{onChangeHandler}"
                >


                    <option value="all">All</option>
                    <option value="id">Title</option>
                    <option value="email">Author</option>
                    {/* Add more options based on your user object structure */}
                </select>
                <button type="submit" form="search-bar-admin">
                    Search
                </button>
            </form>
        </>
    )


}