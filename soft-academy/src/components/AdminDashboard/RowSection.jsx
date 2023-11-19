import'./rowSection.css'


export const RowSection = ({_id, email, _createdOn }) => {

    return (
        <>
            <div className="row-section">
                {/* <h2>User information</h2> */}
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Created On:</strong> {_createdOn}</p>
            </div>
        </>
    )
}