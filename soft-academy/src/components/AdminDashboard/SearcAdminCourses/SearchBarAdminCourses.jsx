import { useForm } from "../../Hooks/useForm"
import { useCourseContext } from "../../contexts/CourseContext"


export const SearchBarAdminCourses = () => {

    const { onSearchSubmitAdminCourse } = useCourseContext()
    const { values, onSubmit, onChangeHandler } = useForm({
        searchTerm: "",
        searchCriteria: '',
    }, onSearchSubmitAdminCourse)



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
                    <option value="name">Name</option>
                    <option value="email">Email</option>
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