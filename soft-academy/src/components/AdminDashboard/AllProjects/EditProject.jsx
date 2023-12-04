import { useNavigate, useParams } from "react-router-dom"
import { forumServiceFactory } from "../../Services/forumService"
import { useService } from "../../Hooks/useService"
import { useForm } from "../../Hooks/useForm"
import { useEffect } from "react"
import { AdminSidebar } from "../AdminSideBar"
import { useForumContext } from "../../contexts/ForumContext"

export const EditProject=()=>{
    const { projectId } = useParams()
    const forumService = useService(forumServiceFactory)
    const navigate = useNavigate()

    const onEditSubmitProject =async(projectData)=>{
        try {
    
    
            const post = await forumService.updateProject(projectId , projectData)
    
            // dispatch(editForumPost(projectData, post))
            navigate(`/admin/projects`)
        } catch (err) {
            // dispatch({ type: 'SET_ERROR_MESSAGE_PROJECTS', payload: err.message || 'An error occurred' });
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
    
    const { onSubmitWithOut, values, onChangeHandler,onChangeValues } = useForm({
        title:"",
        description:"",
        team:"",
        youtube:"",
        techniques:"",
    }, onEditSubmitProject)

   
    useEffect(() => {
        forumService.getOneProject(projectId )
            .then(result => {

                onChangeValues(result)
            })
            .catch(error => {
                console.log(error.message || error)
            })

    }, [projectId ])


    const onCloseComments = () => {
        navigate(`/admin/projects`)

    }



return(
    <>

    <section className="course-details-admin">
        <section className="sidebar">
            <AdminSidebar />
        </section>

        <section className="render-section">
            <div className="close-button-forum-custom" onClick={onCloseComments}>
                X
            </div>
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
                        Techniques used:<span className="required-field-project">*</span>
                            <input type="text" name="techniques" value={values.techniques} onChange={onChangeHandler} />
                        </label>
                        <label>
                            Youtube url:<span className="required-field-project">*</span>
                            <input type="text" name="youtube" value={values.youtube} onChange={onChangeHandler} />
                        </label>
                        <label>
                        Website:<span className="required-field-project">*</span>
                            <input type="text" name="website" value={values.website} onChange={onChangeHandler} />
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
    </section>
</>
)

}