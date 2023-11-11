
import { useParams } from 'react-router-dom'
import './forumDetails.css'
import { useEffect, useState } from 'react'
import { useService } from '../../Hooks/useService'
import { forumServiceFactory } from '../../Services/forumService'


export const ForumDetails = () => {
    const [onePost, setOnePost] = useState([])

    const forumService = useService(forumServiceFactory)

    const { forumId } = useParams()




    useEffect(() => {
        forumService.getOne(forumId)
            .then(result => {
                setOnePost(result)
            })
            .catch(error => {
                console.error("Error fetching forum post:", error);
                throw new Error("Error fetching forum post")

            });

    }, [forumId])


    return (
        <>
            <section className="YourComponent">

                <div className="ImageSection">
                    <img src="URL" alt="Заглавие на снимката" />
                </div>
            </section>
            <section className="TextSection">

                <div >
                    <h2>title</h2>
                    <p>description</p>
                    <p>Author: author</p>
                    <p>Created At: createdAt</p>
                    <div className="ButtonsSection">
                        <button className="editButton">Edit</button>
                        <button className="deleteButton">Delete</button>
                        <button className="likeButton">Like</button>
                        <button className="commentButton">Comment</button>
                    </div>
                    <ul>
                        <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
                    </ul>
                </div>

            </section>
        </>
    )
}