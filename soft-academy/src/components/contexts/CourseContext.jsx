import { courseServiceFactory } from "../Services/courseService";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const CourseContext = createContext()


export const CourseProvider = ({ children }) => {

    const [course, setCourse] = useState([])

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

            return course.find(course=> course.id === courseId)
        }


          const onDeleteClick = async (id) => {
            const result = await courseService.delete(id)
         
        
            setCourse(state => state.filter(x => x._id !== id))
        
            navigate("/catalog")
         
          }
          const onEditSubmit=async(data)=>{
            try{
                const course = await courseService.update(course._id,data)
        setCourse(course => course.map(x => x._id === data._id ? game : x))

            }catch(err){
                throw new Error(err.message || err)
            }
          }

    const contextCourseValue = {
        onCreateCourseSubmit,
        courses: course,
        selectCourse,
        onDeleteClick,
  

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