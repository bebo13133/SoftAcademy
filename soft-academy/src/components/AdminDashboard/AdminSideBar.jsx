
import { Link } from "react-router-dom"

export const AdminSidebar = () => {

    return (
        <>
            <div className="customers">


                <Link to="/admin/customers-list"><h2>Customers</h2></Link>
            </div>
            <div className="admin-chat">


                <Link to="/admin/admin-chat"><h2>Admin Chat</h2></Link>

            </div>
            <div className="admin-chat">


                <Link to="/admin/all-courses"><h2>All courses</h2></Link>

            </div>
            <div className="admin-chat">


                <Link to="/admin/all-forums"><h2>All forums</h2></Link>

            </div>
        </>
    )
}