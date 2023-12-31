import { AdminChatPage } from '../AdminPage/AdminChatPage'
import { TermsAndConditions } from '../Footer/TermsAndConditions/TermsAndConditions'
import { AdminSidebar } from './AdminSideBar'
import { AllCourses } from './AllCourses'
import { AllForums } from './AllForums/AllForums'
import { CustomerList } from './CustomerList'
import { SearchBarAdminCourses } from './SearcAdminCourses/SearchBarAdminCourses'
import './adminDashboard.css'
import { Link, Route, Routes, useRoutes } from 'react-router-dom'


export const AdminDashboard = () => {


    const routes = useRoutes([
        { path: 'customers-list', element: <CustomerList /> },
        { path: 'admin-chat', element: <AdminChatPage /> },
        { path: 'all-courses', element: <AllCourses /> },
        { path: 'all-forums', element: <AllForums /> },




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