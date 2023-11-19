import './rowSection.css'

export const RowSectionCourse=({_id,_createdOn,email,date})=>{

return(

    <>
    <div className="row-section-course">
        <p><strong>ID:</strong> {_id}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Created On:</strong> {_createdOn}</p>
        <p><strong>Start date:</strong> {date}</p>
        <p><strong>Students:</strong> </p>


        <button className="btn btn-primary-course"> Details</button>
    </div>
</>
)

}