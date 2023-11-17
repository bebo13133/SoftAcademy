import { Link } from "react-router-dom"
import './forumSideBar.css'
export const SideBarPost =({
    imageUrl,
    title,
    _id,
    createdAt
})=>{


    return(
        <>
        <section className="forum-img-sideBar">
          <ul>
              
                    <li >
                        <Link to={`/forum/${_id}`}>
                            <img src={imageUrl} alt={title} />
                            <span>{title}</span>
                            <span>{createdAt}</span>
                        </Link>
                    </li>
                    <li><div className="divider"></div></li>
            </ul>
            </section>
        </>
    )
}