import { useNavigate } from 'react-router-dom'
import './rowSection.css'

export const RowSectionCourse=({_id,_createdOn,email,date})=>{

    const courseId = _id

const navigate= useNavigate()

const onNavigateDetails=()=>{
    navigate(`/admin/all-courses/${courseId}`)

}


return(

    <>
    <div className="row-section-course">
        <p><strong>ID:</strong> {_id}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Created On:</strong> {_createdOn}</p>
        <p><strong>Start date:</strong> {date}</p>
        <p><strong>Students:</strong> </p>


        <button className="btn btn-primary-course" onClick={onNavigateDetails}> Details</button>
    </div>
</>
)

}