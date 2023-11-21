import { Route, Routes } from "react-router-dom"
import { AdminDashboard } from "../components/AdminDashboard/AdminDashboard"
import { AllCourses } from "../components/AdminDashboard/AllCourses"

import { CustomerList } from "../components/AdminDashboard/CustomerList"

import { AdminChatPage } from "../components/AdminPage/AdminChatPage"
import { IsAdmin } from "../components/common/IsAdmin"
import { SearchBarPage } from "../components/AdminDashboard/SearchBarAdmin/SearchBarPage"
import { SearchBarAdminCourses } from "../components/AdminDashboard/SearcAdminCourses/SearchBarAdminCourses"
import { CourseDetails } from "../components/AdminDashboard/CourseDetails"
import EmailAdmin from "../components/AdminDashboard/EmailAdmin"
import { SearchAdminCourses } from "../components/AdminDashboard/SearcAdminCourses/SearcAdminCourses"

const AdminRoutes = () => {

    return (
        <>

            <Routes>
                <Route path="/*" element={<IsAdmin><AdminDashboard /></IsAdmin>}>
                    <Route path="admin-chat" element={<AdminChatPage />} />
                    <Route path="customers-list" element={<CustomerList />} />
                    <Route path="all-courses" element={<AllCourses />} />
                </Route>
                <Route path="search-customer" element={<IsAdmin><SearchBarPage /></IsAdmin>} />
                <Route path="all-courses/:courseId" element={<IsAdmin><CourseDetails /></IsAdmin>} />
                <Route path="send-email/:userId" element={<IsAdmin><EmailAdmin /></IsAdmin>} />
                <Route path="search-course" element={<IsAdmin><SearchAdminCourses /></IsAdmin>} />
            </Routes>
        </>


    )

}
export default AdminRoutes