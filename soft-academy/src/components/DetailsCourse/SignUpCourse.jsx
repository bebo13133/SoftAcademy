import "./signUpCourse.css"


export const SignUpCourse=()=>{


    return(
        <>
        <div>
                <div className="sign-course-card">
                <img className="sign-course-img" src="/img/joinUp.webp" alt="sign-course" />
                    <h2>Course: <span>Java</span> </h2>
                    <p className="lector-disc"><span role="img" aria-label="play">▶</span> Start in: 22.09.2023
                    </p>
                    <p className="lector-disc"> <span role="img" aria-label="calendar">📆</span> 6 weeks </p>
        
                    <p className="lector-disc"> <span role="img" aria-label="credits">💳</span> 6 credits </p>
                     <button className="show-more-button-join" onClick="{toggleShowMore}">Sign Up</button>
                </div>
                {/* {!showMore && <button className="show-more-button-course" onClick={toggleShowMore}>Show More</button>}
                {showMore && <button className="show-more-button-course" onClick={toggleShowMore}>Show Less</button>} */}
            </div>
        </>
    )
}