import { AdminSidebar } from './AdminSideBar'
import './courseDetails.css'


export const CourseDetails = () => {


    return (
        <section className="course-details-admin">
            <section className="sidebar">
                <AdminSidebar />
            </section>

            <section className="render-section">
                <form method="POST" className="form-admin-course" onSubmit="{onSubmitWithOut}">
                    <div className="banner-custom"></div>
                    <div className="close-button-forum-custom" onClick="{onCloseComments}">
                        X
                    </div>
                    <h2>Course Details</h2>
                    <div className="item-custom">
                        <p>Course name</p>
                        <div className="name-item-custom">
                            <input type="text" name="courseName" placeholder="Course name" value="{values.courseName}" onChange="{onChangeHandler}" />
                        </div>
                    </div>
                    <div className="item-custom">
                        <p>Lector name</p>
                        <div className="name-item-custom">
                            <input type="text" name="firstName" placeholder="First" value="{values.firstName}" onChange="{onChangeHandler}" />
                            <input type="text" name="lastName" placeholder="Last" value="{values.lastName}" onChange="{onChangeHandler} " />
                        </div>
                    </div>
                    <div className="item-custom">
                        <p>Lector Description</p>
                        <input type="text" name="lectorDescription" placeholder="Lector Description" value="{values.lectorDescription}" onChange="{onChangeHandler}" />
                    </div>
                    <div className="item-custom">
                        <input type="file" name="lectorImage" placeholder="Lector Description" accept="image/*" onChange="{lectorImageHandler}" />
                    </div>
                    <div className="item-custom">
                        <p>Email</p>
                        <input type="text" name="email" placeholder="Email" value="{values.email} " onChange="{onChangeHandler}" />
                    </div>
                    <div className="item-custom">
                        <p>User name</p>
                        <input type="text" name="ownerCourse" placeholder="User name" value="{values.ownerCourse}" onChange="{onChangeHandler}" />
                    </div>
                    <div className="item-custom">
                        <p>Language</p>
                        <div className="city-item-custom">
                            <select value="{selectOption}" placeholder="Choice your language" name="language" onChange="{selectOptionHandler}" >
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
                    {/* {selectedImage ? (
                        <div className="image-container-custom" name="imageUrl" value="{imageUrl}" id="image-container">
                            <img src="{values.imageUrl}" alt="Selected Image" />
                        </div>
                    ) :
                        (<div className="image-container-custom empty" id="image-container">
                            <input type="text" name="imageUrl2" placeholder="Enter URL icon " value="{values.imageUrl2}" onChange={onChangeHandler} />
                        </div>)} */}
                    <h2>Course Description</h2>
                    <div className="item-custom">
                        <p>Description</p>
                        <input type="text" name="description" placeholder="Description" value="{values.description}" onChange="{onChangeHandler}" />
                    </div>
                    <div className="item-custom">
                        <p>Price</p>
                        <input type="number" name="price" placeholder="Course price" value="{values.price}" onChange="{onChangeHandler}" />
                    </div>
                    <div className="item-custom">
                        <p>Start Date</p>
                        <input type="date" name="date" value="{values.date}" onChange="{onChangeHandler}" />
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