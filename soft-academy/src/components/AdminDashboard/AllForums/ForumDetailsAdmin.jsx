import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "../../Hooks/useForm"
import { forumServiceFactory } from "../../Services/forumService"
import { useService } from "../../Hooks/useService"
import { useForumContext } from "../../contexts/ForumContext"
import "./allForums.css"
import { useEffect } from "react"
import { AdminSidebar } from "../AdminSideBar"
export const ForumDetailsAdmin = () => {

    const { onEditSubmitPost } = useForumContext()
    const { forumId } = useParams()
    const forumService = useService(forumServiceFactory)
    const navigate = useNavigate()


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

    };


    const { onSubmit, onChangeHandler, values, onChangeValues } = useForm({
        title: "",
        description: "",
        author: "",
        createdAt: new Date().toLocaleString(),
    }, onEditSubmitPost)


    
    useEffect(() => {
        forumService.getOne(forumId)
            .then(result => {

                onChangeValues(result)
            })


    }, [forumId])


    const onCloseComments = () => {
        navigate(`/admin/all-forums`)

    }


    return (
        <>

            <section className="course-details-admin">
                <section className="sidebar">
                    <AdminSidebar />
                </section>

                <section className="render-section">
                    <div className="close-button-forum-custom" onClick={onCloseComments}>
                        X
                    </div>
                    <form className="form-admin-forum" method="PUT" onSubmit={onSubmit}>

                        <h2>Form Title</h2>

                        <label className="item-custom">
                            Title:
                            <input type="text" name="title" value={values.title} onChange={onChangeHandler} />
                        </label>

                        <label className="item-custom">
                            Description:
                            <textarea name="description" value={values.description} onChange={onChangeHandler} />
                        </label>

                        <label className="item-custom image-container-custom">
                            Image:
                            <input type="file" name="imageUrl" onChange={handleImageChange} accept="image/*" />
                        </label>

                        <label className="item-custom">
                            Author:
                            <input type="text" name="author" value={values.author} onChange={onChangeHandler} />
                        </label>

                        <label className="item-custom">
                            Created At:
                            <input type="text" name="createdAt" value={(new Date().toLocaleString())} onChange={onChangeHandler} readOnly />
                        </label>

                        {values.imageUrl && (
                            <div className="image-container-custom">
                                <p>Preview:</p>
                                <img src={values.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </div>
                        )}

                        <div className="btn-block-edit-custom">
                            <button type="submit">Edit Post</button>
                        </div>

                        <ul>
                            <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                        </ul>
                    </form>
                </section>
            </section>
        </>
    )
}