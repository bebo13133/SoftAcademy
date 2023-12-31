import { useNavigate } from 'react-router-dom'
import './rowSection.css'
import { useEffect, useState } from 'react'
import { ConfirmBox } from '../ConfirmBox/ConfirmBox'
import { useCourseContext } from '../contexts/CourseContext'
import { courseServiceFactory } from '../Services/courseService'
import { useAuthContext } from '../contexts/UserContext'

export const RowSectionCourse = ({ _id, _createdOn, email, date, courseName, onDeleteClick }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [payments,setPayments] = useState([])
    const { token } = useAuthContext()

    const courseId = _id
    const { onDeleteClickAdmin } = useCourseContext()
    const navigate = useNavigate()
    const courseService = courseServiceFactory(token)

    const onNavigateDetails = () => {
        navigate(`/admin/all-courses/${courseId}`)

    }
    const openDelete = () => {
        setIsOpen(true)
    }
    const onCloseDelete = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        courseService.getAllStudentsPayment(courseId)
        .then(result=>{
            setPayments(result)
        })

    }, [onCloseDelete, onDeleteClickAdmin])

    return (

        <>
            <div className="row-section-course">
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Course Name:</strong> {courseName}</p>

                <p><strong>Email:</strong> {email}</p>
                <p><strong>Created On:</strong> {_createdOn}</p>
                <p><strong>Start date:</strong> {date}</p>
                <p><strong>Students:</strong> {payments.length}</p>


                <button className="btn-primary-course" onClick={onNavigateDetails}> Details</button>
                <button className="btn-delete-course" onClick={() => openDelete()}> Delete</button>
            </div>

            <ConfirmBox open={isOpen} closeDialog={() => onCloseDelete()}               // title={deleteData?.name}
                deleteFunction={() => { setIsOpen(false), onDeleteClick(courseId) }}
            />
        </>
    )

}