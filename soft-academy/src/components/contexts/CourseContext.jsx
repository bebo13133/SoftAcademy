import { courseServiceFactory } from "../Services/courseService";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./UserContext";
import './error.css'

export const CourseContext = createContext()


export const CourseProvider = ({ children }) => {
    const { token } = useAuthContext()
    const [course, setCourse] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [languages, setLanguage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(''); //error messages


    const courseService = courseServiceFactory(token)
    const navigate = useNavigate()

    useEffect(() => {

        courseService.getAll()
            .then(result => {
                setCourse(result)
            })

    }, [])

    const onCreateCourseSubmit = async (courseData) => {
        try {
            if (!courseData.courseName ||
                !courseData.firstName ||
                !courseData.lastName ||
                !courseData.email ||
                !courseData.ownerCourse ||
                !courseData.price ||
                !courseData.description ||
                !courseData.lectorDescription) {
                setErrorMessage("Some field is empty")
                setErrorMessage(() => {
                    setErrorMessage('');
                }, 4000);
                return
            }

            if (courseData.courseName.length < 2 || courseData.firstName.length < 4
                || courseData.lastName.length < 4 || courseData.email.length < 9) {
                setErrorMessage("Minimum field length is 4 for names, 9 for email and 2 for course name")
                    ("Minimum field length is 4 for names, 9 for email and 2 for course name")

                setTimeout(() => {
                    setErrorMessage('');
                }, 4000);
                return
            }

            if (courseData.lectorDescription.length < 5 || courseData.description.length < 20) {
                setErrorMessage("Minimum field description length is 20 and minimum 5 for lectorDescription ")

                setTimeout(() => {
                    setErrorMessage('');
                }, 4000);
                return
            }

            if (courseData.price === isNaN) {
                setErrorMessage("The Price must be number")

                setTimeout(() => {
                    setErrorMessage('');
                }, 4000);
                return
            }

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
        if (!data.courseName ||
            !data.firstName ||
            !data.lastName ||
            !data.email ||
            !data.ownerCourse ||
            !data.price ||
            !data.description ||
            !data.lectorDescription) {
            setErrorMessage("Some field is empty")
            setErrorMessage(() => {
                setErrorMessage('');
            }, 4000);
            return
        }

        if (data.courseName.length < 2 || data.firstName.length < 4
            || data.lastName.length < 4 || data.email.length < 9) {
            setErrorMessage("Minimum field length is 4 for names, 9 for email and 2 for course name")
                ("Minimum field length is 4 for names, 9 for email and 2 for course name")

            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return
        }

        if (data.price == isNaN) {
            setErrorMessage("The Price must be number")

            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return
        }
        if (data.lectorDescription.length < 5 || data.description.length < 20) {
            setErrorMessage("Minimum field description length is 20 and minimum 5 for lectorDescription ")

            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
return
        }



        try {
            const result = await courseService.update(data._id, data)
            setCourse(courses => courses.map(x => x._id === data._id ? result : x))
            navigate(`/catalog/${data._id}`)
        } catch (err) {

        }
    }


    const onSearchSubmit = async (data) => {
        try {
            const result = await courseService.getAll();
            if (!data.criteria || data.criteria == "Select an option") {
                // Търсене без конкретен критерий
                setSearchResult(result.filter(course =>
                    course.courseName?.toLowerCase().includes(data.searchName.toLowerCase())
                    || course.selectOption?.toLowerCase().includes(data.searchName.toLowerCase())
                ));
            } else {
                // Търсене с определен критерий
                if (data.criteria === 'courseName') {
                    const searchTerms = data.searchName.toLowerCase().split(' ');
                    const searchResults = result.filter(course =>
                        searchTerms.every(term => course.courseName?.toLowerCase().includes(term))
                    );
                    setSearchResult(searchResults);
                } else if (data.criteria == 'language-name') {
                    setSearchResult(result.filter(course => course.selectOption?.toLowerCase().includes(data.searchName.toLowerCase())));
                } else if (data.criteria == 'lector-name') {
                    setSearchResult(result.filter(course =>
                        course.firstName?.toUpperCase().includes(data.searchName.toUpperCase())
                        || course.lastName?.toLowerCase().includes(data.searchName.toLowerCase())));


                }

            }
            // console.log("result",result)

            if (searchResult.length > 0) {
                navigate("/search-page");
            }
        } catch (err) {
            throw new Error(err.message || err);
        }
    };
    // console.log(searchResult)

    const onSubmitLanguageBar = async (language) => {

        try {
            const result = await courseService.getAll();

            setLanguage(state => result.filter(x => x.selectOption === language))
            // navigate('/languageCatalog')
        } catch (err) {

        }


        // console.log("language",language)
    }




    const contextCourseValue = {
        searchResult,
        onSearchSubmit,
        onCreateCourseSubmit,
        courses: course,
        selectCourse,
        onDeleteClick,
        onEditSubmit,
        onSubmitLanguageBar,
        languages
    }

    return (

        <CourseContext.Provider value={contextCourseValue}>

            {children}
            <div className={`error-message ${errorMessage && 'show-error custom-style'}`}>
                <p>{errorMessage}</p>
            </div>
        </CourseContext.Provider>

    )

}
export const useCourseContext = () => {
    const context = useContext(CourseContext);

    return context;
};