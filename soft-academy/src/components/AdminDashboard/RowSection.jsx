import { useNavigate } from 'react-router-dom'
import'./rowSection.css'


export const RowSection = ({_id, email, _createdOn }) => {
const navigate=useNavigate()
const userId= _id
    const onEmailHandler=() => {
        navigate(`/admin/send-email/${userId}`)
}
    return (
        <>
            <div className="row-section">
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Created On:</strong> {_createdOn}</p>
                  <button className="btn-primary-customer" onClick={onEmailHandler}> Send Email</button>

            </div>
        </>
    )
}