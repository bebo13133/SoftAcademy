import { useForm } from "../Hooks/useForm"

export const AddComments=({
    onCommentSubmit

})=>{
    const {values,onChangeHandler,onSubmit}=useForm({
        comment:"",
    },onCommentSubmit)
    return(
        <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form-comment" onSubmit={onSubmit}>
            {/* <input type="text" name="username" placeholder="name" value={values.username} onChange={onChangeHandler} ></input> */}
            <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={onChangeHandler}></textarea>
            <input className="btn-comment submit" type="submit" value="Add Comment" />
        </form>
    </article>
    )
}