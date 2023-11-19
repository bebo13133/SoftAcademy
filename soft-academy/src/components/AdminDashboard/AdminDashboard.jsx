import { AdminChatPage } from '../AdminPage/AdminChatPage'
import { AdminSidebar } from './AdminSideBar'
import { AllCourses } from './AllCourses'
import { CustomerList } from './CustomerList'
import './adminDashboard.css'
import { Link, useRoutes } from 'react-router-dom'


export const AdminDashboard = () => {


    const routes = useRoutes([
        { path: 'customers-list', element: <CustomerList /> },
        { path: 'admin-chat', element: <AdminChatPage /> },
        { path: 'all-courses', element: <AllCourses /> },



    ])

    return (
        <>
            <div className="admin-dashboard">
                <section className="sidebar">
                <AdminSidebar/>
                </section>


                <section className="render-section">
                    {routes}
                </section>

            </div>
        </>

    )
}