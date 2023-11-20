import { Route, Routes } from "react-router-dom"
import { AdminDashboard } from "../components/AdminDashboard/AdminDashboard"
import { AllCourses } from "../components/AdminDashboard/AllCourses"
import { CourseDetails } from "../components/AdminDashboard/CourseDetails"
import { CustomerList } from "../components/AdminDashboard/CustomerList"
import EmailAdmin from "../components/AdminDashboard/EmailAdmin"
import { SearchBarAdminCourses } from "../components/AdminDashboard/SearcAdminCourses/SearchBarAdminCourses"
import { SearchBarPage } from "../components/AdminDashboard/SearchBarAdmin/SearchBarPage"
import { AdminChatPage } from "../components/AdminPage/AdminChatPage"
import { IsAdmin } from "../components/common/IsAdmin"

const AdminRoutes = ()=>{

return(
<>
<Routes>
      <Route path="/*" element={<IsAdmin><AdminDashboard /></IsAdmin>}>
        <Route path="admin-chat" element={<AdminChatPage replace/>} />
        <Route path="customers-list" element={<CustomerList />} />
        <Route path="all-courses" element={<AllCourses/>} />
        {/* <Route path="all-courses/:courseId" element={<CourseDetails />} />
        <Route path="send-email/:userId" element={<EmailAdmin />} /> */}
        {/* <Route path="search-customer" element={<SearchBarPage />} />
        <Route path="search-course" element={<SearchBarAdminCourses />} /> */}
      </Route>
    </Routes>
</>


)

}
export default AdminRoutes