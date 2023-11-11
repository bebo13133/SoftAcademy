
import { useParams,Link, useNavigate } from 'react-router-dom'
import './forumDetails.css'
import { useEffect, useState } from 'react'
import { useService } from '../../Hooks/useService'
import { forumServiceFactory } from '../../Services/forumService'
import { useAuthContext } from '../../contexts/UserContext'
import { ConfirmBox } from '../../ConfirmBox/ConfirmBox'
import { useForumContext } from '../../contexts/ForumContext'


export const ForumDetails = () => {
    const [onePost, setOnePost] = useState([])
    const [isOpen,setIsOpen]= useState(false)
    const {onDeleteClick} = useForumContext()
    const forumService = useService(forumServiceFactory)

    const { forumId } = useParams()

const navigate = useNavigate()
const{userId} =useAuthContext()

const isOwner = userId === onePost._ownerId

    useEffect(() => {
        forumService.getOne(forumId)
            .then(result => {
                setOnePost(result)
            })
            .catch(error => {
              
                throw new Error("Error fetching forum post")

            });

    }, [forumId])

    const onBackHandler=()=>{
        navigate('/forum')

    }


    const openDelete=(forumId)=>{
        setIsOpen(true)
    }

    const onCloseDelete=()=>{
        setIsOpen(false)
    }
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
                    <div className="ButtonsSection">
                        {isOwner && (<><button className="editButton">Edit</button>
                        <button className="deleteButton" onClick={() => openDelete()}>Delete</button></>)}
                        
                        <button className="likeButton">Like</button>
                        <button className="commentButton">Comment</button>


                        <button className="back-to-forum-btn" onClick={onBackHandler}>Back to Forum</button>
                    </div>
                    <ul>
                        <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                    </ul>
                </div>

            </section>
            <ConfirmBox open={isOpen} closeDialog={() => onCloseDelete()} deleteFunction={() => { setIsOpen(false), onDeleteClick(forumId) }}/>
        </>
    )
}