import { useNavigate } from 'react-router-dom'
import { useForm } from '../../Hooks/useForm'
import { useService } from '../../Hooks/useService'
import { forumServiceFactory } from '../../Services/forumService'
import { AdminSidebar } from '../AdminSideBar'
import '../adminDashboard.css'
import './addProjectForm.css'
import { useAuthContext } from '../../contexts/UserContext'
import { useState } from 'react'




export const AddProjectForm = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [formErrors, setFormErrors] = useState({
        title: false,
        description: false,
        team: false,
        techniques: false,
        youtube: false,
        imageUrl: false,
        websiteUrl: false,

    })
    const navigate =useNavigate()

    const forumService = useService(forumServiceFactory)


    const onSubmitProject = async(projectData)=>{

   
        if (!projectData.title && !projectData.description && !projectData.team && !projectData.techniques && !projectData.youtube && !projectData.imageUrl && !projectData.websiteUrl) {
            setErrorMessage("Some fields is empty")
            setFormErrors({ title: true, description: true, team: true, techniques: true, youtube: true, imageUrl: true,website:true})
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors({ title: false, description: false, team: false, techniques: false, youtube: false, imageUrl: false, website:false})
            }, 4000);

            return;
        }
        if (!projectData.title) {
            setErrorMessage("Some fields is empty")
            setFormErrors(state => ({ ...state, title: true }))
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors(state => ({ ...state, title: false }))
            }, 4000);
            return;
        }
        if (!projectData.website) {
            setErrorMessage("Some fields is empty")
            setFormErrors(state => ({ ...state, website: true }))
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors(state => ({ ...state, website: false }))
            }, 4000);
            return;
        }
        if (!projectData.description) {
            setErrorMessage("Some fields is empty")
            setFormErrors(state => ({ ...state, description: true }))
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors(state => ({ ...state, description: false }))
            }, 4000);
            return;
        }   if (!projectData.team) {
            setErrorMessage("Some fields is empty")
            setFormErrors(state => ({ ...state, team: true }))
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors(state => ({ ...state, team: false }))
            }, 4000);
            return;
        }   if (!projectData.techniques) {
            setErrorMessage("Some fields is empty")
            setFormErrors(state => ({ ...state, techniques: true }))
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors(state => ({ ...state, techniques: false }))
            }, 4000);
            return;
        }   if (!projectData.youtube) {
            setErrorMessage("Some fields is empty")
            setFormErrors(state => ({ ...state, youtube: true }))
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors(state => ({ ...state, youtube: false }))
            }, 4000);
            return;
        }   if (!projectData.imageUrl) {
            setErrorMessage("Some fields is empty")
            setFormErrors(state => ({ ...state, imageUrl: true }))
            setTimeout(() => {
                setErrorMessage('');
                setFormErrors(state => ({ ...state, imageUrl: false }))
            }, 4000);
            return;
        }
    
   
        const trimmedData = {};
        Object.keys(projectData).forEach(key => {
         
            trimmedData[key] = projectData[key].trim()
        });  


        try{
           await forumService.createProject(projectData)

            navigate("/projects")
        }catch(err){
            console.log(err.message || err);
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
        techniques:"",
        website:"",
    }, onSubmitProject)



    return (
        <>
            <div className="admin-dashboard">

                <section className="sidebar" >
                    <AdminSidebar />
                </section>


                <section className="render-section">

                    <form className="post-form-project" onSubmit={onSubmitWithOut}>
                        <label className={formErrors.title ? "error-project" : ""}>
                            Title:<span className="required-field-project">*</span>
                            <input type="text" name="title" value={values.title} onChange={onChangeHandler} />
                        </label>
                        <label className={formErrors.description ? "error-project" : ""}>
                            Description:<span className="required-field-project">*</span>
                            <textarea name="description" value={values.description} onChange={onChangeHandler} />
                        </label>
                        <label className={formErrors.techniques ? "error-project" : ""}>
                        Techniques used:<span className="required-field-project">*</span>
                            <input type="text" name="techniques" value={values.techniques} onChange={onChangeHandler} />
                        </label>
                        <label  className={formErrors.youtube ? "error-project" : ""}>
                            Youtube url:<span className="required-field-project">*</span>
                            <input type="text" name="youtube" value={values.youtube} onChange={onChangeHandler} />
                        </label>
                        <label className={formErrors.website ? "error-project" : ""}>
                        Website:<span className="required-field-project">*</span>
                            <input type="text" name="website" value={values.website} onChange={onChangeHandler} />
                        </label>
                        <label className={formErrors.imageUrl ? "error-project" : ""}>
                            Image:<span className="required-field-project">*</span>
                            <input type="file" name="imageUrl" onChange={handleImageChange} accept="image/*" />
                        </label>

                        <label className={formErrors.team ? "error-project" : ""}>
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
                    {errorMessage && (
                    <div className={`error-message ${errorMessage && 'show-error custom-style'}`}>
                        <p>{errorMessage}</p>
                    </div>
                )}
                </section>
             
            </div>



        </>
    )

}