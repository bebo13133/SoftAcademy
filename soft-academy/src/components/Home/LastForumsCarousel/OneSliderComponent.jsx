
import './OneSliderComponent.css'
import { Link } from 'react-router-dom'
export const OneSliderComponent = ({
    title,
    description,
    imageUrl,
    author
}) => {


    return (
        <>
        
        
            <div className="my-component-container">
            <Link to="/forum">             
               <img className="my-component-image"src={imageUrl} />
               </Link>

                <div className="my-component-content">
                    <h2 className="my-component-title">{author}</h2>

                    <h3 className="my-component-title">{title}</h3>
                    <p className="my-component-description">{description.slice(0, 120) + "..."}</p>
                </div>
            </div>

        </>

    )
}
