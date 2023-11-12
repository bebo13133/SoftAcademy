
import { useParams, Link, useNavigate } from 'react-router-dom'
import './forumDetails.css'
import { useEffect, useState } from 'react'
import { useService } from '../../Hooks/useService'
import { forumServiceFactory } from '../../Services/forumService'
import { useAuthContext } from '../../contexts/UserContext'
import { ConfirmBox } from '../../ConfirmBox/ConfirmBox'
import { useForumContext } from '../../contexts/ForumContext'
import { CommentsForum } from './CommentsForum/CommentsForum'


export const ForumDetails = () => {
    const [onePost, setOnePost] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const { onDeleteClick } = useForumContext()
    const forumService = useService(forumServiceFactory)
    const [commentsPopUp, setCommentsPopUp] = useState(false)
    const [comments, setComments] = useState([])
    const { forumId } = useParams()

    const navigate = useNavigate()
    const { userId, userEmail } = useAuthContext()

    const isOwner = userId === onePost._ownerId

    // useEffect(() => {
    //     forumService.getOne(forumId)
    //         .then(result => {
    //             setOnePost(result)
    //             return forumService.getAllPosts(forumId)
    //         })
    //         .then(comment => {
    //             console.log("postAll",comment)

    //           setComments(comment)

    //         })
    //         .catch(error => {

    //             throw new Error("Error fetching forum post")

    //         });

    // }, [setComments,forumId,])
  
    const fetchData = async () => {
        try {
            const result = await forumService.getOne(forumId);
            setOnePost(result);
            const commentResult = await forumService.getAllPosts(forumId);
      

            setComments(commentResult);
        } catch (error) {
            throw new Error("Error fetching forum post");
        }
    };


    const onBackHandler = () => {
        navigate('/forum')

    }

    const onEditHandler = () => {
        navigate(`/forum/${forumId}/edit`)
    }
    const openCommentsPopUp = () => {
        setCommentsPopUp(true)
    }
    const closeCommentsPopUp = () => {
        setCommentsPopUp(false)
    }

    const openDelete = () => {
        setIsOpen(true)
    }

    const onCloseDelete = () => {
        setIsOpen(false)
    }

    const onPostSubmit = async (values) => {
            if(!values.comment) return alert("Please enter a comment") 
        try {
            const postForum = await forumService.createPost(
                forumId,
                values.comment,
                values.user
               
            )
       
            setComments(state => [...state, { comment: postForum.comment, user: postForum.user }])
            // console.log("comments",comments)
            await fetchData()  // извиквам fetchData за да пререндерира отново компонента , за да може да ми сетне id-то което трявба 
                               // да подам надолу , иначе не работят delete и like ... 
        } catch (error) {

            throw new Error(error.message)
        }
    }


    const onDeletePostHandler=(commentId)=>{
// console.log("coomentID", commentId)
        forumService.deleteComment(commentId)
        setComments(state => state.filter(comment => comment._id !== commentId))
    }
    useEffect(() => {
 
        fetchData(); 


    }, [forumId]);

    return (
        <>
            <section className="YourComponent">
                <div className="ImageSection">
                    <img src={onePost.imageUrl} alt={onePost.title} />
                </div>
            </section>
            <section className="TextSection">
                <div >
                    <h2>{onePost.title}</h2>
                    <div className="divider"></div>
                    <p>{onePost.description}</p>
                    <p>Author: {onePost.author}</p>
                    <p>Created At: {onePost.createdAt}</p>
                    <div className="divider"></div>
                    <div className="ButtonsSection">
                        {isOwner && (<><button className="editButton" onClick={onEditHandler}>Edit</button>
                            <button className="deleteButton" onClick={() => openDelete()}>Delete</button></>)}

                        <button className="likeButton">Like</button>
                        <button className="commentButton" onClick={openCommentsPopUp}>Comments</button>

                        <button className="back-to-forum-btn" onClick={onBackHandler}>Back to Forum</button>
                    </div>
                    <ul>
                        <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} >Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                    </ul>
                </div>

            </section>
            <CommentsForum 
            key={forumId} // подавам го заради кеша , vite да разпознае по лесно ако настъпи промяна 
            isOpenComments={commentsPopUp} 
            onCloseComments={closeCommentsPopUp} 
            onPostSubmit={onPostSubmit} {...onePost} 
            comments={comments}
             onDeletePostHandler={onDeletePostHandler} />

            <ConfirmBox open={isOpen}
             closeDialog={() => onCloseDelete()} deleteFunction={() => { setIsOpen(false), onDeleteClick(forumId) }}
             />
        </>
    )
}