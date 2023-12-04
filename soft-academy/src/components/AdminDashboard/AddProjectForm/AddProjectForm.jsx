import { useNavigate } from 'react-router-dom'
import { useForm } from '../../Hooks/useForm'
import { useService } from '../../Hooks/useService'
import { forumServiceFactory } from '../../Services/forumService'
import { AdminSidebar } from '../AdminSideBar'
import '../adminDashboard.css'
import './addProjectForm.css'




export const AddProjectForm = () => {
    const navigate =useNavigate()
    const forumService = useService(forumServiceFactory)


    const onSubmitProject = async(data)=>{
        console.log("hi")
        try{
           await forumService.createProject(data)

            navigate("/")
        }catch(err){

        }

    }


    const handleImageChange = (e) => {
        const file = e.target.files[0]
    
        if (file) {
    
            const reader = new FileReader()
    
            reader.onloadend = () => {
    
                onChangeHandler({ target: { name: 'imageUrl', value: reader.result } });
            }
            reader.readAsDataURL(file);
            // console.log(reader.readAsDataURL(file))
        }
    
    }
    
    const { onSubmitWithOut, values, onChangeHandler } = useForm({
        title:"",
        description:"",
        team:"",
        youtube:"",
    }, onSubmitProject)



    return (
        <>
            <div className="admin-dashboard">

                <section className="sidebar">
                    <AdminSidebar />
                </section>


                <section className="render-section">

                    <form className="post-form-project" onSubmit={onSubmitWithOut}>
                        <label>
                            Title:<span className="required-field-project">*</span>
                            <input type="text" name="title" value={values.title} onChange={onChangeHandler} />
                        </label>
                        <label>
                            Description:<span className="required-field-project">*</span>
                            <textarea name="description" value={values.description} onChange={onChangeHandler} />
                        </label>
                        <label>
                            Youtube url:<span className="required-field-project">*</span>
                            <input type="text" name="youtube" value={values.youtube} onChange={onChangeHandler} />
                        </label>
                        <label>
                            Image:<span className="required-field-project">*</span>
                            <input type="file" name="imageUrl" onChange={handleImageChange} accept="image/*" />
                        </label>

                        <label>
                            Team description:<span className="required-field-project">*</span>
                            <input type="text" name="team" value={values.team} onChange={onChangeHandler} />
                        </label>
                        {values.imageUrl && (
                            <div>
                                <p>Preview:</p>
                                <img src={values.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </div>
                        )}

                        <button type="submit">Create project</button>
                        <ul>
                            <li className="navbar-brand" style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                        </ul>
                    </form>
                </section>

            </div>



        </>
    )

}