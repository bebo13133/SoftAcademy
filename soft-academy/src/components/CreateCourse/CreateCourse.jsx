import { useState } from 'react'
import { useForm } from '../Hooks/useForm'

import { useCourseContext } from '../contexts/CourseContext'
import Footer from '../Footer/Footer'

export const CreateCourse = () => {

    const [selectOption, setSelectOptions] = useState("")

    const { onCreateCourseSubmit } = useCourseContext()

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
        Java: "https://static.vecteezy.com/system/resources/previews/019/899/953/non_2x/java-free-download-free-png.png",
        Python: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
        ReactJS: "https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png",
        "JavaScript": "https://cdn3d.iconscout.com/3d/premium/thumb/javascript-7308311-5938360.png",
        'C#': "https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png",
        "VueJs": "https://user-images.githubusercontent.com/7110136/29002858-a09570d2-7ab4-11e7-8faa-5dd6d4458b0d.png",
        "TypeScript": "https://cdn-icons-png.flaticon.com/512/919/919832.png",
        "HTML&CSS": "https://cdn-icons-png.flaticon.com/512/174/174854.png",
        "Angular": "https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg",
        "FullStackDeveloper": "https://static.thenounproject.com/png/390336-200.png",
        "CyberSecurity": "https://jdimi.com/wp-content/uploads/sites/4/2022/03/Cyber-Security-PNG-Clipart.png",
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
        price: "",
        description: "",
        imageUrl2: "",
        lectorDescription: "",
        // lectorImage,
        // selectOption,
        // imageUrl,
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

                        <input type="file" name="lectorImage" placeholder="Lector Description" accept="image/*" onChange={lectorImageHandler} />

                    </div>
                    <div className="item">
                        <p>Lector Image</p>
                        {values.lectorImage && (
                            <img src={values.lectorImage} alt="Lector" />
                        )}
                    </div>

                    <div className="item">
                        <p>Email</p>
                        <input type="text" name="email" placeholder="Email" value={values.email} onChange={onChangeHandler} />
                    </div>
                    <div className="item">
                        <p>User name</p>
                        <input type="text" name="ownerCourse" placeholder="User name" value={values.ownerCourse} onChange={onChangeHandler} />
                    </div>
                    <div className="item">
                        <p>Language</p>
                        <div className="city-item">
                            <select value={selectOption} placeholder="Choice your language" name="language" onChange={selectOptionHandler} >
                                <option value="">Select an option</option>
                                <option value="JavaScript">Java Script</option>
                                <option value="Java">Java</option>
                                <option value="Python">Python</option>
                                <option value="ReactJS">ReactJS</option>
                                <option value="C#">C#</option>
                                <option value="VueJs">Vue Js</option>
                                <option value="TypeScript">Type Script</option>
                                <option value="HTML&CSS">HTML&CSS</option>
                                <option value="Angular">Angular</option>
                                <option value="FullStackDeveloper">FullStack Developer</option>
                                <option value="CyberSecurity">Cyber Security</option>

                            </select>
                        </div>

                    </div>
                    {selectedImage ? (
                        <div className="image-container" name="imageUrl" value={imageUrl} id="image-container">
                            <img src={values.imageUrl} alt="Selected Image" />
                        </div>
                    ) :
                        (<div className="image-container empty" id="image-container">
                            <input type="text" name="imageUrl2" placeholder="Enter URL icon " value={values.imageUrl2} onChange={onChangeHandler} />
                        </div>)}



                    <h2>Course Description</h2>
                    <div className="item">
                        <p>Description</p>
                        <input type="text" name="description" placeholder="Description" value={values.description} onChange={onChangeHandler} />
                    </div>
                    <div className="item">
                        <p>Price</p>
                        <input type="number" name="price" placeholder="Course price" value={values.price} onChange={onChangeHandler} />
                    </div>

                    <div className="item">
                        <p>Start Date</p>
                        <input type="date" name="date" value={values.date} onChange={onChangeHandler} />
                        <i className="fas fa-calendar-alt"></i>
                    </div>

                    <div className="btn-block">
                        <button type="submit" value="send">Create</button>
                    </div>
                    <ul>
                        <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                    </ul>
                </form>
            </div>
            <Footer />

        </>
    )
}