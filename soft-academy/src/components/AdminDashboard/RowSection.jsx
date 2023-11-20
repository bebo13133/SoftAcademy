import'./rowSection.css'


export const RowSection = ({_id, email, _createdOn }) => {

    return (
        <>
            <div className="row-section">
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Created On:</strong> {_createdOn}</p>
                  <button className="btn-primary-customer" onClick="{}"> Send Email</button>

            </div>
        </>
    )
}