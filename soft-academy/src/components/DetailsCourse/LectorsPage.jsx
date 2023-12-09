import { useState } from 'react';
import './lectorPage.css'



export const LectorPage = ({
    lectorImage,
    lectorDescription,
    firstName,
    lastName,
}) => {
    const [showMore, setShowMore] = useState(false);

    
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

        const firstDescriptions =lectorDescription?.slice(0,200)
     

    return (
        <>
            <div>
                <div className="lector-card">
                    <img className="lector-img" src={lectorImage} alt="lector-img" />
                    <h2>Lector: <span>{firstName} {lastName}</span> </h2>
                    <p className="lector-disc"> {showMore ? lectorDescription : firstDescriptions}
                    </p>
                </div>
                {!showMore && <button className="show-more-button-course" onClick={toggleShowMore}>Show More</button>}
                {showMore && <button className="show-more-button-course" onClick={toggleShowMore}>Show Less</button>}
            </div>
        </>
    )
}
