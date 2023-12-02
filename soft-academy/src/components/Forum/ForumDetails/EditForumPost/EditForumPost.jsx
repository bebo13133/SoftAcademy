import { Fragment, useEffect } from "react";
import { useForumContext } from "../../../contexts/ForumContext";
import { useForm } from "../../../Hooks/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../../../Hooks/useService";
import { forumServiceFactory } from "../../../Services/forumService";
import './editForum.css'


export const EditForumPost = () => {

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




    const { onSubmit, onChangeHandler, onChangeValues, values } = useForm({
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
            .catch(error => {
                console.error(error.message || error);
            });

    }, [forumId])

    // const handleClickOutside = (e) => {                    //При натискане извън полето да се затвори 
    //     if (e.target.className === "post-form-close") {
    //         navigate(`/forum/${forumId}`)
    //     }
    // }
    const onCloseComments = () => {
        navigate(`/forum/${forumId}`)

    }

    return (

        <>
            <section className="post-form-close"
            //  onClick={handleClickOutside}
             >
                <div className="close-button-forum" onClick={onCloseComments}>
                    X
                </div>
                <form className="post-form" method="PUT" onSubmit={onSubmit} >

                    <label>
                        Title:
                        <input type="text" name="title" value={values.title} onChange={onChangeHandler} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={values.description} onChange={onChangeHandler} />
                    </label>
                    <label>
                        Image:
                        <input type="file" name="imageUrl" onChange={handleImageChange} accept="image/*" />
                    </label>

                    <label>
                        Author:
                        <input type="text" name="author" value={values.author} onChange={onChangeHandler} />
                    </label>
                    <label>
                        Created At:
                        <input type="text" name="createdAt" value={(new Date().toLocaleString())} onChange={onChangeHandler} readOnly />
                    </label>
                    {values.imageUrl && (
                        <div>
                            <p>Preview:</p>
                            <img src={values.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    )}

                    <button type="submit">Edit Post</button>
                    <ul>
                        <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                    </ul>
                </form>
            </section>


        </>
    )


}