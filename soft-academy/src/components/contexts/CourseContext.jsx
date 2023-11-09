import { courseServiceFactory } from "../Services/courseService";
import { createContext, useContext, useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";


export const CourseContext = createContext()


export const CourseProvider = ({ children }) => {

    const [course, setCourse] = useState([])
    const [searchResult, setSearchResult] = useState([])

    const courseService = courseServiceFactory()
    const navigate = useNavigate()

    useEffect(() => {

        courseService.getAll()
            .then(result => {
                setCourse(result)
            })

    }, [])

    const onCreateCourseSubmit = async (courseData) => {
        try {

            const newCourse = await courseService.create(courseData)
            setCourse(state => [...state, newCourse])
            navigate("/catalog")

        } catch (err) {

            throw new Error(err.message || err)
        }

    }

    const selectCourse = (courseId) => {

        return course.find(course => course.id === courseId)
    }


    const onDeleteClick = async (id) => {

        try {
            const result = await courseService.delete(id)


            setCourse(state => state.filter(x => x._id !== id))

            navigate("/catalog")
        } catch (err) {
            throw new Error(err.message || err)
        }


    }
    const onEditSubmit = async (data) => {
        try {
            const result = await courseService.update(data._id, data)
            setCourse(courses => courses.map(x => x._id === data._id ? result : x))
            navigate(`/catalog/${data._id}`)
        } catch (err) {
            throw new Error(err.message || err)
        }
    }


    const onSearchSubmit = async (data) => {
        const result = await courseService.getAll()
        // console.log("result", result)
        // console.log("result-data", data)

        setSearchResult(result.filter(course => course.courseName?.toLowerCase().includes(data.searchName.toLowerCase())
            || course.selectOption?.toLowerCase().includes(data.searchName.toLowerCase())));
        navigate('/searchPage')

    }
    // console.log(searchResult)




    const contextCourseValue = {
        searchResult,
        onSearchSubmit,
        onCreateCourseSubmit,
        courses: course,
        selectCourse,
        onDeleteClick,
        onEditSubmit
    }

    return (

        <CourseContext.Provider value={contextCourseValue}>

            {children}

        </CourseContext.Provider>

    )

}
export const useCourseContext = () => {
    const context = useContext(CourseContext);

    return context;
};