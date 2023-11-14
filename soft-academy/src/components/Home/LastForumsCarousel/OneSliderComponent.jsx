
import './OneSliderComponent.css'

export const OneSliderComponent = ({
    title,
    description,
    imageUrl,
    author
}) => {
    return (
        <>
            {/* <div className="my-component-container">
                <img src={imageUrl} alt="imageUrl" className="my-component-image" />
                <div className="my-component-content">
                    <h2 className="my-component-title">{title}</h2>
                    <p className="my-component-description">{description.slice(0,140)}</p>
                </div>
            </div> */}
            <div className="my-component-container">
                <img className="my-component-image"

                    src={imageUrl} />
                <div className="my-component-content">
                    <h2 className="my-component-title">{author}</h2>

                    <h3 className="my-component-title">{title}</h3>
                    <p className="my-component-description">{description.slice(0, 120) + "..."}</p>
                </div>
            </div>
        </>

    )
}
