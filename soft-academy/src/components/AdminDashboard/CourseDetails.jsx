import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../Hooks/useForm'
import { AdminSidebar } from './AdminSideBar'

import { useCourseContext } from '../contexts/CourseContext'
import { useService } from '../Hooks/useService'
import { courseServiceFactory } from '../Services/courseService'
import { useEffect, useState } from 'react'
import './courseDetails.css'

export const CourseDetails = () => {
    const [selectOption, setSelectOptions] = useState('')

    const { onEditSubmitAdmin, formErrors } = useCourseContext()
console.log("fprms",formErrors)
    const courseService = useService(courseServiceFactory)
    const { courseId } = useParams()
    const navigate = useNavigate()

    const lectorImageHandler = (e) => {
        const file = e.target.files[0] // подсигурявам да вземе сам оедин файл

        if (file) {

            const reader = new FileReader()

            reader.onloadend = () => {

                onChangeHandler({ target: { name: 'lectorImage', value: reader.result } });
            }
            reader.readAsDataURL(file);
        }
    }

    const imageMap = {
        Java: "/img/java2.png",
        Python: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
        ReactJS: "https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png",
        "Java Script": "https://cdn3d.iconscout.com/3d/premium/thumb/javascript-7308311-5938360.png",
        'C#': "https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png",
        "VueJs": "https://w7.pngwing.com/pngs/854/555/png-transparent-vue-js-hd-logo-thumbnail.png",
        "Type Script": "https://cdn-icons-png.flaticon.com/512/919/919832.png",
        "HTML&CSS": "https://www.clipartmax.com/png/middle/291-2918933_html-and-css-logo.png",
        "Angular": "https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg",
        "FullStack Developer": "https://static.thenounproject.com/png/390336-200.png",
        "Cyber Security": "https://jdimi.com/wp-content/uploads/sites/4/2022/03/Cyber-Security-PNG-Clipart.png",
    };
    const selectOptionHandler = (e) => {
        const selectedOption = e.target.value;
        setSelectOptions(selectedOption);
        const selectedImage = imageMap[selectedOption];


        onChangeHandler({ target: { name: 'selectOption', value: selectedOption } });
        onChangeHandler({ target: { name: 'imageUrl', value: selectedImage } });
    }

    const selectedImage = imageMap[selectOption];

    const imageUrl = selectedImage ? `${selectedImage}` : '';





    const { onSubmitWithOut, onSubmit, values, onChangeHandler, onChangeValues } = useForm({
        courseName: "",
        firstName: "",
        lastName: "",
        email: "",
        ownerCourse: "",
        price: "",
        description: "",
        imageUrl2: "",
        lectorDescription: "",
        creditsCourse: "",
        weeksCourse: "",
    }, onEditSubmitAdmin)

    useEffect(() => {
        courseService.getOne(courseId)
            .then(result => {
                onChangeValues(result)
                setSelectOptions(result.selectOption)
            })

    }, [courseId])
    // const handleClickOutside = (e) => {                    //При натискане извън полето да се затвори 
    //     if (e.target.className === "testbox") {
    //         navigate(`/catalog/${courseId}`)
    //     }
    // }
    const onCloseForm = () => {
        navigate(`/admin/all-courses`)

    }
    return (
       
        <section className="course-details-admin">
            <section className="sidebar">
                <AdminSidebar />
            </section>

            <section className="render-section">
                <form method="POST" className="form-admin-course" onSubmit={onSubmitWithOut}>
                    <div className="banner-custom"></div>
                    <div className="close-button-forum-custom" onClick={onCloseForm}>
                        X
                    </div>
                    <h2>Course Details</h2>
                    <div className="item-custom">
                        <p>Course name  <span className="required-field">*</span></p>
                        <div className="name-item-custom">
                            <input type="text" className={formErrors.courseName ? "error" : ""}  name="courseName" placeholder="Course name" value={values.courseName} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="item-custom">
                        <p>Lector name <span className="required-field">*</span></p>
                        <div className="name-item-custom">
                            <input type="text" name="firstName" className={formErrors.firstName ? "error" : ""} placeholder="First" value={values.firstName} onChange={onChangeHandler} />
                            <input type="text" name="lastName" className={formErrors.lastName ? "error" : ""} placeholder="Last" value={values.lastName} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="item-custom">
                        <p>Lector Description <span className="required-field">*</span> </p>
                        <input type="text" name="lectorDescription" className={formErrors.lectorDescription ? "error" : ""} placeholder="Lector Description" value={values.lectorDescription} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <input type="file" name="lectorImage" className={formErrors.lectorImage ? "error" : ""} placeholder="Lector Description" accept="image/*" onChange={lectorImageHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Email <span className="required-field">*</span></p>
                        <input type="text" name="email" className={formErrors.email ? "error" : ""} placeholder="Email" value={values.email} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>User name<span className="required-field">*</span></p>
                        <input type="text" name="ownerCourse" className={formErrors.ownerCourse ? "error" : ""} placeholder="User name" value={values.ownerCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Language<span className="required-field">*</span></p>
                        <div className="city-item-custom">
                            <select value="{selectOption}" placeholder="Choice your language" name="language" onChange={selectOptionHandler} >
                                <option value="">Select an option</option>
                                <option value="Java Script">Java Script</option>
                                <option value="Java">Java</option>
                                <option value="Python">Python</option>
                                <option value="ReactJS">ReactJS</option>
                                <option value="C#">C#</option>
                                <option value="VueJs">Vue Js</option>
                                <option value="Type Script">Type Script</option>
                                <option value="HTML&CSS">HTML&CSS</option>
                                <option value="Angular">Angular</option>
                                <option value="FullStack Developer">FullStack Developer</option>
                                <option value="Cyber Security">Cyber Security</option>
                            </select>
                        </div>
                    </div>
                    {selectedImage ? (
                        <div className="image-container-custom" name="imageUrl" value={imageUrl} id="image-container">
                            <img src={values.imageUrl} alt="Selected Image" />
                        </div>
                    ) :
                        (<div className="image-container-custom empty" id="image-container" required >
                            <input type="text" name="imageUrl2" className={formErrors.imageUrl2 ? "error" : ""} placeholder="Enter URL icon " value={values.imageUrl2} onChange={onChangeHandler}   />
                        </div>)}
                    <h2>Course Description<span className="required-field">*</span></h2>
                    <div className="item-custom">
                        <p>Description<span className="required-field">*</span></p>
                        <input type="text" name="description" className={formErrors.description ? "error" : ""} placeholder="Description" value={values.description} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Credits<span className="required-field">*</span></p>
                        <input type="number" name="creditsCourse" className={formErrors.creditsCourse ? "error" : ""} placeholder="credits.." value={values.creditsCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Weeks<span className="required-field">*</span></p>
                        <input type="number" name="weeksCourse" className={formErrors.weeksCourse ? "error" : ""} placeholder="weeks.." value={values.weeksCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Price<span className="required-field">*</span></p>
                        <input type="number" name="price" className={formErrors.price ? "error" : ""} placeholder="Course price" value={values.price} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Start Date<span className="required-field">*</span></p>
                        <input type="date" name="date" className={formErrors.date ? "error" : ""} value={values.date} onChange={onChangeHandler} />
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="btn-block-edit-custom">
                        <button type="submit" value="send">Edit</button>
                    </div>
                </form>


            </section>
        </section>
   
    )
}