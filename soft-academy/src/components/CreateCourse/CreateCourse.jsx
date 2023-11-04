import { useState } from 'react'
import { useForm } from '../Hooks/useForm'

import { useCourseContext } from '../contexts/CourseContext'

export const CreateCourse = () => {

    const [selectOption, setSelectOptions] = useState("")

    const { onCreateCourseSubmit } = useCourseContext()

    const imageMap = {
        Java: "./img/java.webp",
        Python: "./img/Python-logo-notext.svg.png",
        ReactJS: "./img/react.png",
        "Java Script": "./img/javascript-7308311-5938360.webp",
        'C#': "./img/c-sharp.png",
        "VueJs": "./img/vue.png",
        "Type Script": "./img/46634674.png",
        "HTML&CSS": "./img/html.png",
        "Angular": "./img/angular.png",
        "FullStack Developer": "./img/full.png",
        "Cyber Security": "./img/cyber.png",
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
    const { onSubmit, onChangeHandler, values } = useForm({
        courseName: "",
        firstName: "",
        lastName: "",
        email: "",
        ownerCourse: "",
        price:"",
        description: "",
        imageUrl2:"",
        lectorDescription:"",
        selectOption,
        imageUrl,
    }, onCreateCourseSubmit)

    return (
        <>
            <div className="testbox">
                <form method="POST" onSubmit={onSubmit}>
                    <div className="banner">

                    </div>
                    <h2>Course Details</h2>
                    <div className="item">
                        <p>Course name</p>
                        <div className="name-item">
                            <input type="text" name="courseName" placeholder="Course name" value={values.courseName} onChange={onChangeHandler} />

                        </div>
                    </div>
                    <div className="item">
                        <p>Lector name</p>
                        <div className="name-item">
                            <input type="text" name="firstName" placeholder="First" value={values.firstName} onChange={onChangeHandler} />
                            <input type="text" name="lastName" placeholder="Last" value={values.lastName} onChange={onChangeHandler} />
                        </div>
                    </div>
                    {/* <h2>Lector Description</h2> */}
                    <div className="item">
                        <p>Lector Description</p>
                        <input type="text" name="lectorDescription" placeholder="Lector Description" value={values.lectorDescription} onChange={onChangeHandler} />
                    </div>
                    <div className="item">
                        <p>Lector image</p>
                        <input type="file" name="lectorImage" placeholder="Lector Description" value={values.lectorImage} onChange={onChangeHandler} />
                        <buttom>Upload</buttom>
                    </div>


                    <div className="item">
                        <p>Email</p>
                        <input type="text" name="email"placeholder="Email" value={values.email} onChange={onChangeHandler} />
                    </div>
                    <div className="item">
                        <p>User name</p>
                        <input type="text" name="ownerCourse" placeholder="User name"value={values.ownerCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item">
                        <p>Language</p>
                        <div className="city-item">
                            <select value={selectOption} placeholder="Choice your language" name="language" onChange={selectOptionHandler} >
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
                        <div className="image-container" name="imageUrl" value={imageUrl} id="image-container">
                            <img src={values.imageUrl} alt="Selected Image" />
                        </div>
                    ):
                    (<div className="image-container empty" id="image-container">
                    <input type="text"name="imageUrl2" placeholder="Enter URL icon " value={values.imageUrl2} onChange={onChangeHandler} />
                  </div>)}


                  
                    <h2>Course Description</h2>
                    <div className="item">
                        <p>Description</p>
                        <input type="text" name="description" placeholder="Description" value={values.description} onChange={onChangeHandler} />
                    </div>
                    <div className="item">
                        <p>Price</p>
                        <input type="text" name="price" placeholder="Course price" value={values.price} onChange={onChangeHandler} />
                    </div>

                    <div className="item">
                        <p>Start Date</p>
                        <input type="date" name="date"  value={values.date} onChange={onChangeHandler} />
                        <i className="fas fa-calendar-alt"></i>
                    </div>

                    <div className="btn-block">
                        <button type="submit" value="send">Create</button>
                    </div>
                </form>
            </div>

        </>
    )
}