import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../Hooks/useForm'
import { AdminSidebar } from './AdminSideBar'
import './courseDetails.css'
import { useCourseContext } from '../contexts/CourseContext'
import { useService } from '../Hooks/useService'
import { courseServiceFactory } from '../Services/courseService'
import { useEffect, useState } from 'react'


export const CourseDetails = () => {
    const [selectOption, setSelectOptions] = useState('')

    const { onEditSubmitAdmin } = useCourseContext()

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





    const {onSubmitWithOut,onSubmit, values,onChangeHandler,onChangeValues}=useForm({
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
    },onEditSubmitAdmin)

    useEffect(() => {
        courseService.getOne(courseId)
            .then(result => {
                onChangeValues(result)
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
                        <p>Course name</p>
                        <div className="name-item-custom">
                            <input type="text" name="courseName" placeholder="Course name" value={values.courseName}onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="item-custom">
                        <p>Lector name</p>
                        <div className="name-item-custom">
                            <input type="text" name="firstName" placeholder="First" value={values.firstName} onChange={onChangeHandler} />
                            <input type="text" name="lastName" placeholder="Last" value={values.lastName} onChange={onChangeHandler}  />
                        </div>
                    </div>
                    <div className="item-custom">
                        <p>Lector Description</p>
                        <input type="text" name="lectorDescription" placeholder="Lector Description" value={values.lectorDescription} onChange={onChangeHandler}/>
                    </div>
                    <div className="item-custom">
                        <input type="file" name="lectorImage" placeholder="Lector Description" accept="image/*" onChange={lectorImageHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Email</p>
                        <input type="text" name="email" placeholder="Email" value={values.email}  onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>User name</p>
                        <input type="text" name="ownerCourse" placeholder="User name" value={values.ownerCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Language</p>
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
                        (<div className="image-container-custom empty" id="image-container">
                            <input type="text" name="imageUrl2" placeholder="Enter URL icon " value={values.imageUrl2} onChange={onChangeHandler} />
                        </div>)}
                    <h2>Course Description</h2>
                    <div className="item-custom">
                        <p>Description</p>
                        <input type="text" name="description" placeholder="Description" value={values.description} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Credits</p>
                        <input type="number" name="creditsCourse" placeholder="credits.." value={values.creditsCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Weeks</p>
                        <input type="number" name="weeksCourse" placeholder="weeks.." value={values.weeksCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Price</p>
                        <input type="number" name="price" placeholder="Course price" value={values.price} onChange={onChangeHandler} />
                    </div>
                    <div className="item-custom">
                        <p>Start Date</p>
                        <input type="date" name="date" value={values.date} onChange={onChangeHandler}/>
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