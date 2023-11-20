export const SearchBar = () => {
    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value="{searchTerm}"
                    onChange="{(e) => setSearchTerm(e.target.value)}"
                />

                <select
                    value="{searchCriteria}"
                    onChange="{(e) => setSearchCriteria(e.target.value)}"
                >
                    <option value="name">Name</option>
                    <option value="id">ID</option>
                    <option value="email">Email</option>
                    {/* Add more options based on your user object structure */}
                </select>
                <button onClick="{() => setCurrentResults(filterUsers(searchTerm, searchCriteria))}">
                    Search
                </button>
            </div>
        </>

    )
}