import { courseServiceFactory } from "../Services/courseService";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./UserContext";
import './error.css'
import { useDispatch, useSelector } from 'react-redux';
import { setError } from "../actions";

export const CourseContext = createContext()


export const CourseProvider = ({ children }) => {



    const { token } = useAuthContext()
    const [course, setCourse] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [adminSearch,setAdminSearch] = useState([])
    console.log("result43", adminSearch)
    const [languages, setLanguage] = useState(null)
    // const [errorMessage, setErrorMessage] = useState(''); //error messages
    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.errorReducer.errorMessage);




    const courseService = courseServiceFactory(token)
    const navigate = useNavigate()

    useEffect(() => {

        courseService.getAll()
            .then(result => {
                setCourse(result)
            })
            .catch(error => {
                console.log(error.message || error)
            })
    }, [])

    const onCreateCourseSubmit = async (courseData) => {

        if (!courseData.courseName ||
            !courseData.firstName ||
            !courseData.lastName ||
            !courseData.email ||
            !courseData.ownerCourse ||
            !courseData.price ||
            !courseData.description ||
            !courseData.lectorDescription) {


            dispatch(setError("Some fields is empty"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return

        }

        if (courseData.courseName.length < 2 || courseData.firstName.length < 4
            || courseData.lastName.length < 4 || courseData.email.length < 9) {


            dispatch(setError("Minimum field length is 4 for names, 9 for email and 2 for course name"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }

        if (courseData.lectorDescription.length < 5 || courseData.description.length < 20) {


            dispatch(setError("Minimum field description length is 20 and minimum 5 for lectorDescription"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }

        if (courseData.price === isNaN) {

            dispatch(setError("The Price must be number"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return

        }
        try {

            const newCourse = await courseService.create(courseData)

            setCourse(state => [...state, newCourse])
            navigate("/catalog")

        } catch (err) {

            console.log(err.message || err)
        }

    }



    const selectCourse = (courseId) => {  //използвам го при гарда IsOwner за да отделя текущият курс 

        return course.find(course => course.id === courseId)
    }


    const onDeleteClick = async (id) => {

        try {
            const result = await courseService.delete(id)


            setCourse(state => state.filter(x => x._id !== id))

            navigate("/catalog")
        } catch (err) {
            console.log(err.message || err)
        }


    }
    const onDeleteClickAdmin = async (id) => {

        try {
            const result = await courseService.delete(id)


            setCourse(state => state.filter(x => x._id !== id))

            navigate("/admin/all-courses")
        } catch (err) {
            console.log(err.message || err)
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


            dispatch(setError("Some fields is empty"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return

        }

        if (data.courseName.length < 2 || data.firstName.length < 4
            || data.lastName.length < 4 || data.email.length < 9) {


            dispatch(setError("Minimum field length is 4 for names, 9 for email and 2 for course name"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }

        if (data.lectorDescription.length < 5 || data.description.length < 20) {


            dispatch(setError("Minimum field description length is 20 and minimum 5 for lectorDescription"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }

        if (data.price === isNaN) {

            dispatch(setError("The Price must be number"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return

        }


        try {
            const result = await courseService.update(data._id, data)
            setCourse(courses => courses.map(x => x._id === data._id ? result : x))
            navigate(`/catalog/${data._id}`)
        } catch (err) {
            console.log(err.message || err);
        }
    }

    const onEditSubmitAdmin = async (data) => {
        if (!data.courseName ||
            !data.firstName ||
            !data.lastName ||
            !data.email ||
            !data.ownerCourse ||
            !data.price ||
            !data.description ||
            !data.lectorDescription) {


            dispatch(setError("Some fields is empty"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return

        }

        if (data.courseName.length < 2 || data.firstName.length < 4
            || data.lastName.length < 4 || data.email.length < 9) {


            dispatch(setError("Minimum field length is 4 for names, 9 for email and 2 for course name"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }

        if (data.lectorDescription.length < 5 || data.description.length < 20) {


            dispatch(setError("Minimum field description length is 20 and minimum 5 for lectorDescription"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }

        if (data.price === isNaN) {

            dispatch(setError("The Price must be number"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return

        }


        try {
            const result = await courseService.update(data._id, data)
            setCourse(courses => courses.map(x => x._id === data._id ? result : x))
            navigate(`/admin/all-courses`)
        } catch (err) {
            console.log(err.message || err);
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
            console.log(err.message || err);
        }
    };



    const onSearchSubmitAdminCourse = async(data) => {

        try {
           const result= await courseService.getAll()

            if (!data.searchTerm || data.searchCriteria === "all") {
                setAdminSearch(result)
            }
            if (data.searchCriteria == "id") {
                setAdminSearch(result.filter(x => x._id.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }
            if (data.searchCriteria == "email") {
                setAdminSearch(result.filter(x => x.email.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }
            if (data.searchCriteria == "name") {
                setAdminSearch(result.filter(x => x.courseName.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }
            navigate("/admin/search-course")
        } catch (error) {
         console.log(error.message || error);


    }
}






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
        adminSearch,
        onCreateCourseSubmit,
        courses: course,
        selectCourse,
        onDeleteClick,
        onEditSubmit,
        onSubmitLanguageBar,
        languages,
        onEditSubmitAdmin,
        onDeleteClickAdmin,
        onSearchSubmitAdminCourse,
        
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