import { useForm } from "../../Hooks/useForm"
import { useState } from "react";
import './addForumPost.css'
import { useForumContext } from "../../contexts/ForumContext";


export const AddForumPost = () => {
    const [image, setImage] = useState(null);
    const { onPostSubmit } = useForumContext()

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file) {

            const reader = new FileReader()

            reader.onloadend = () => {

                onChangeHandler({ target: { name: 'imageUrl', value: reader.result } });
            }
            reader.readAsDataURL(file);
            console.log(reader.readAsDataURL(file))
        }

    };


    // onChangeHandler({ target: { name: 'image', value: selectedImage } });

    const { onSubmit, values, onChangeHandler } = useForm({
        title: "",
        description: "",
        // imageUrl: "",
        author: "",
        createdAt: "",

    }, onPostSubmit)


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
                    <input type="file" name="imageUrl" onChange={handleImageChange} accept="image/*" />
                </label>

                <label>
                    Author:
                    <input type="text" name="author" value={values.author} onChange={onChangeHandler} />
                </label>
                <label>
                    Created At:
                    <input type="text" name="createdAt" value={new Date().toLocaleString()} readOnly />
                </label>
                {values.imageUrl && (
                    <div>
                        <p>Preview:</p>
                        <img src={values.imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>
                )}

                <button type="submit">Create Post</button>
            </form>


        </>
    )


}