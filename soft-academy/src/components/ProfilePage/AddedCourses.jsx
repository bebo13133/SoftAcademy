export const AddedCourses = () => {






    return (

        <>
            <section id="explore" className="explore">
                <div className="container">
                    <div className="section-header">
                        <h2>Courses</h2>
                        <p>Explore New place, food, culture around the world and many more</p>
                    </div>
                    <div className="explore-content">
                        <div className="row">



                            {courses.length > 0 ? courses.map(course => <OneCourse key={course._id} {...course} />) : <h3 className="no-articles">No articles yet</h3>}


                        </div>


                    </div>
                </div>

            </section>
        </>
    )

}