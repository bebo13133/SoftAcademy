import { Link } from "react-router-dom"
import './forumSideBar.css'
export const SideBarPost =({
    imageUrl,
    title,
    _id
})=>{

console.log("imageUrl", imageUrl)
    return(
        <>
          <ul>
              
                    <li >
                        <Link to={`/forum/${_id}`}>
                            <img src={imageUrl} alt={title} />
                            <span>{title}</span>
                        </Link>
                    </li>
           
            </ul>
        </>
    )
}