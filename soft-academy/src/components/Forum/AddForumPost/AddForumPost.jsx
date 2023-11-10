import { useForm } from "../../Hooks/useForm"
import { useState } from "react";
import './addForumPost.css'


export const AddForumPost = () => {
    const [image, setImage] = useState(null);


    const { onSubmit, values, onChangeHandler } = useForm({
        title: "",
        description: "",
        image: "",
        author: "",
        createdAt: "",
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };


    return (

        <>
            <form className="post-form" onSubmit={onSubmit}>
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
                    <input type="file" ame="image" onChange={handleImageChange} accept="image/*" />
                </label>

                <label>
                    Author:
                    <input type="text" name="author" value={values.author} onChange={onChangeHandler} />
                </label>
                <label>
                    Created At:
                    <input type="text" name="createdAt" value={new Date().toLocaleString()} readOnly />
                </label>
                {image && (
                    <div>
                        <p>Preview:</p>
                        <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>
                )}

                <button type="submit">Create Post</button>
            </form>


        </>
    )


}