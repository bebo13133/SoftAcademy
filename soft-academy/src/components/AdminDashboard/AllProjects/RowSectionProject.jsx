import '../../AdminDashboard/rowSection.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { ConfirmBox } from "../../ConfirmBox/ConfirmBox"


export const RowSectionProject=({

    title,
 
    youtube,

    website,
    _id,
    onDeleteClick,
    _createdOn

})=>{
    const [isOpen, setIsOpen] = useState(false)

    const projectId= _id
    const navigate = useNavigate()
    const openDelete = () => {
        setIsOpen(true)
    }
    const onCloseDelete = () => {

        setIsOpen(false)
    }

   const onAddClick=() => {
    navigate("/admin/add-project")
   }
   const onNavigateEdit = () => {

    navigate(`/admin/projects/${projectId}`)

}

    return(
    <>
    <div className="row-section-course">
        <p><strong>ID:</strong> {_id}</p>
        <p><strong>Project Name:</strong> {title}</p>

        <p><strong>website:</strong> {website}</p>
        <p><strong>Created On:</strong> {_createdOn}</p>
        <p><strong>youtube</strong> {youtube}</p>
        {/* <p><strong>Likes</strong> {likes.length}</p> */}



      
        <button className="btn-primary-course" onClick={onAddClick}> Add</button>
        <button className="btn-primary-course" onClick={onNavigateEdit}> Edit</button>

        <button className="btn-delete-course" onClick={() => openDelete()}> Delete</button>
    </div>
    <ConfirmBox key={_id} open={isOpen} closeDialog={() => onCloseDelete()}                // title={deleteData?.name}
        deleteFunction={() => { setIsOpen(false), onDeleteClick(projectId) }} />
</>
    )
}