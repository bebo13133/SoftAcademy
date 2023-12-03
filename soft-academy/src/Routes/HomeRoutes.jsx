import { Route, Routes } from "react-router-dom"
import { Logout } from "../components/Logout/Logout"
import { CreateCourse } from "../components/CreateCourse/CreateCourse"
import { DetailsCourse } from "../components/DetailsCourse/DetailsCourse"
import { LanguageCatalog } from "../components/Home/LanguageBar/LanguageCatalog"
import { EditCourse } from "../components/EditCourse/EditCourse"
import  IsOwnerCourse  from "../components/common/isOwnerCourse"
import { ForumStudents } from "../components/Forum/ForumStudents"
import { ForumDetails } from "../components/Forum/ForumDetails/ForumDetails"
import { EditForumPost } from "../components/Forum/ForumDetails/EditForumPost/EditForumPost"
import { AddForumPost } from "../components/Forum/AddForumPost/AddForumPost"
import { ProfilePage } from "../components/ProfilePage/ProfilePage"
import { ChangePassword } from "../components/ProfilePage/ChangePassword"
import { AddedCourses } from "../components/ProfilePage/AddedCourses"
import { FavoriteCourses } from "../components/ProfilePage/FavoriteCourses"
import { AvatarHeader } from "../components/ProfilePage/AvatarHeader"
import IsOwnerForum from "../components/common/IsOwnerForum"
import { SignForm } from "../components/DetailsCourse/SignForm/SignForm"
import { InvoiceCard } from "../components/DetailsCourse/InvoiceCard/InvoiceCard"
import { TrainingCourses } from "../components/ProfilePage/TrainingCourses/TrainingCourses"
import { SearchPageForum } from "../components/Forum/SearcBarForum/SearcPagrForum"

 const HomeRoutes = ()=>{

    return(
        <>
    <Routes>

      <Route path="/logout" element={<Logout />} />
      <Route path="/create" element={<CreateCourse />} />
      <Route path="/catalog/:courseId" element={<DetailsCourse />} />
      <Route path="/language-catalog" element={<LanguageCatalog />} />
      <Route path="/catalog/:courseId/sign-form" element={<SignForm />} />
      <Route path="/catalog/:courseId/payment-card" element={<InvoiceCard />} />

      <Route path="/catalog/:courseId/edit" element={
      <IsOwnerCourse>
      <EditCourse />
      </IsOwnerCourse>
      } />

      <Route path="/forum" element={<ForumStudents />} />
      <Route path="/forum/search-result" element={<SearchPageForum />} />

      <Route path="/forum/:forumId" element={<ForumDetails />} />

      <Route path="/forum/:forumId/edit" element={
        <IsOwnerForum>
        <EditForumPost />
         </IsOwnerForum>
      }/>
/training-courses
      <Route path="/add-new-post" element={<AddForumPost />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/training-courses" element={<TrainingCourses />} />

      <Route path="/my-added-courses" element={<AddedCourses />} />
      <Route path="/favorite-courses" element={<FavoriteCourses />} />
      <Route path="/change-avatar" element={<AvatarHeader />} />


    </Routes>
    </>
    )
}
export default HomeRoutes