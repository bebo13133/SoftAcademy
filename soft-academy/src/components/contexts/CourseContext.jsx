import { courseServiceFactory } from "../Services/courseService";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const CourseContext = createContext()


export const CourseProvider = ({ children }) => {

    const [courses, setCourse] = useState([])
    const [isOpen,setIsOpen] = useState(false)

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

            return courses.find(course=> course.id === courseId)
        }

        const openDelete = (courses)=>{
            setIsOpen(true)
          }

          const onDeleteClick = async (courseId) => {
            const result = await gameService.delete(courseId)
           setIsOpen(false)
        
            setGames(state => state.filter(x => x._id !== id))
        
            navigate("/catalog")
        
          }

    const contextCourseValue = {
        onCreateCourseSubmit,
        courses: courses,
        selectCourse,
        onDeleteClick,
        openDelete

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