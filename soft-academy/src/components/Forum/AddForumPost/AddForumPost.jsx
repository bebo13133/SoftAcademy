export const AddForumPost = () => {

    return (


        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} accept="image/*" />
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