import { useForm } from "../Hooks/useForm"
import { RouteGuard } from "../common/RouteGuard"

export const AddComments=({
    onCommentSubmit

})=>{
    const {values,onChangeHandler,onSubmit}=useForm({
        comment:"",
    },onCommentSubmit)
    return(
    <RouteGuard>
        <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form-comment" onSubmit={onSubmit}>
            {/* <input type="text" name="username" placeholder="name" value={values.username} onChange={onChangeHandler} ></input> */}
            <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={onChangeHandler}></textarea>
            <input className="btn-comment submit" type="submit" value="Add Comment" />
        </form>
    </article>
    </RouteGuard>
    )
}