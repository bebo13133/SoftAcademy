import { Route, Routes } from "react-router-dom"
import { useForm } from "../Hooks/useForm"
import { RouteGuard } from "../common/RouteGuard"

export const AddComments = ({
    onCommentSubmit

}) => {
    const { values, onChangeHandler, onSubmit } = useForm({
        comment: "",
    }, onCommentSubmit)
    return (
        

                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form-comment" onSubmit={onSubmit}>
                        <textarea name="comment" placeholder="Comment......" value={values.comment} onChange={onChangeHandler}></textarea>
                        <input className="btn-comment submit" type="submit" value="Add Comment" />
                    </form>
                </article>
       
    )
}