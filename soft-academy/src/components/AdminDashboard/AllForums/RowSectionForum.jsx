import { ConfirmBox } from "../../ConfirmBox/ConfirmBox"

export const RowSectionForum = ({}) => {

    // const onNavigateDetails = () => {
    //     navigate(`/admin/all-courses/${courseId}`)

    // }
    const openDelete = () => {
        setIsOpen(true)
    }
    const onCloseDelete = () => {
        setIsOpen(false)
    }
    return (

        <>
            <div className="row-section-course">
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Course Name:</strong> {courseName}</p>

                <p><strong>Email:</strong> {email}</p>
                <p><strong>Created On:</strong> {_createdOn}</p>
                <p><strong>Start date:</strong> {date}</p>
                <p><strong>Students:</strong> </p>


                <button className="btn-primary-course" onClick="{onNavigateDetails}"> Details</button>
                <button className="btn-delete-course" onClick="{() => openDelete()}"> Delete</button>
            </div>

            <ConfirmBox open={isOpen} closeDialog={() => onCloseDelete()}                // title={deleteData?.name}
                deleteFunction={() => { setIsOpen(false), onDeleteClick(courseId) }} />
        </>
    )
}