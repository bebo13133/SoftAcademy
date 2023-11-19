export const RowSectionCourse=()=>{

return(

    <>
    <div className="row-section-course">
        <p><strong>ID:</strong> {_id}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Created On:</strong> {_createdOn}</p>
        <button className="btn btn-primary-course"> Details</button>
    </div>
</>
)

}