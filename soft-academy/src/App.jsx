// import { useState,useEffect } from 'react'
import { useEffect, useState, lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { UserProvider } from './components/contexts/UserContext'
import { useCookies } from 'react-cookie'
import { Provider } from 'react-redux';
import store from './store/store'
// import { Contact } from './components/Contact/Contact'
const Contact = lazy(() => import('./components/Contact/Contact'))
// import { Blog } from './components/Blog/Blog'

const Blog = lazy(() => import('./components/Blog/Blog'))



// import { CatalogCourses } from './components/CatalogCourses/CatalogCourses'
const CatalogCourses = lazy(() => import('./components/CatalogCourses/CatalogCourses'))



import Footer from './components/Footer/Footer'
import { Header } from './components/Header/Header'

// import { Home } from './components/Home/Home'
const Home = lazy(() => import('./components/Home/Home'))

import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { Logout } from './components/Logout/Logout'
import { CreateCourse } from './components/CreateCourse/CreateCourse'
import { CourseProvider } from './components/contexts/CourseContext'
import { DetailsCourse } from './components/DetailsCourse/DetailsCourse'
import { RouteGuard } from './components/common/RouteGuard'
import { PageNotFound } from './components/404/PageNotFound'
import { GuardLoginRegister } from './components/common/GuardLoginRegister'
import { EditCourse } from './components/EditCourse/EditCourse'
import { IsOwnerCourse } from './components/common/isOwnerCourse'
// import { ChatBox } from './components/ChatBox/ChatBox'

const ChatBox = lazy(() => import('./components/ChatBox/ChatBox'))
import { AdminPage } from './components/AdminPage/AdminPage'
import { IsLoading } from './components/IsLoading/IsLoading'
import { CookieConsent } from './components/CookieConsent/CookieConsent'
import { PrivacyPolicy } from './components/CookieConsent/PrivacyPolicy'
import { ProfilePage } from './components/ProfilePage/ProfilePage'
import { ChangePassword } from './components/ProfilePage/ChangePassword'
import { AddedCourses } from './components/ProfilePage/AddedCourses'
import { FavoriteCourses } from './components/ProfilePage/FavoriteCourses'
import { AvatarHeader } from './components/ProfilePage/AvatarHeader'
import { SearchPage } from './components/SearchPage/SearchPage'
import { ForumStudents } from './components/Forum/ForumStudents'
import { ForumDetails } from './components/Forum/ForumDetails/ForumDetails'
import { AddForumPost } from './components/Forum/AddForumPost/AddForumPost'
import { ForumProvider } from './components/contexts/ForumContext'
import { EditForumPost } from './components/Forum/ForumDetails/EditForumPost/EditForumPost'
import { TermsAndConditions } from './components/Footer/TermsAndConditions/TermsAndConditions'
import { LanguageCatalog } from './components/Home/LanguageBar/LanguageCatalog'
import { IsAdmin } from './components/common/IsAdmin'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const [cookies] = useCookies(["cookieConsent"]);
  // console.log("cookie", cookies)
  useEffect(() => {
    setIsLoading(false)

  }, [])

  const location = useLocation(); // Get the current location

  const isProfilePage = location.pathname.startsWith('/profile') || location.pathname.startsWith("/change-password")
    || location.pathname.startsWith("/my-added-courses") || location.pathname.startsWith("/favorite-courses") || location.pathname.startsWith("/change-avatar")
    || location.pathname.startsWith("/404")
    || location.pathname.startsWith("/terms")
    || location.pathname.startsWith("/admin")
    || location.pathname.startsWith("/forum")
    || location.pathname.startsWith("/blog")
    || location.pathname.startsWith("/")



  const isAdminPage = location.pathname.startsWith('/admin')


  return (

    <>
      {/* {isLoading && <IsLoading />} */}
      <Provider store={store}>
        <UserProvider>
          <CourseProvider>
            <ForumProvider>
              <ErrorBoundary>

                <Header />
                {!cookies.cookieConsent && <CookieConsent />}

                <Routes>

                  <Route path={"/"} element={
                    <Suspense fullback={<IsLoading />}>

                      <Home />  </Suspense>
                  } />
                  <Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
                  <Route path={"/terms"} element={<TermsAndConditions />} />


                  <Route path={"/catalog"} element={
                    <Suspense fullback={<IsLoading />}>
                      <CatalogCourses />
                    </Suspense>
                  } />


                  <Route path={"/blog"} element={
                    <Suspense fullback={<IsLoading />}>
                      <Blog />
                    </Suspense>
                  } />


                  <Route path={"/contact"} element={
                    <Suspense fullback={<IsLoading />}>
                      <Contact />
                    </Suspense>
                  } />
                  <Route path={"/search-page"} element={<SearchPage />} />


                  {/* loginRegisterGuard */}

                  <Route path={"/login"} element={
                    <GuardLoginRegister>
                      <Login />
                    </GuardLoginRegister>
                  } />

                  <Route path={"/register"} element={
                    <GuardLoginRegister>
                      <Register />
                    </GuardLoginRegister>
                  } />
                  {/* Edn LoginRegisterGuard */}


                  {/* Route Guard */}
                  <Route element={<RouteGuard />}>

                    <Route path={"/logout"} element={<Logout />} />

                    <Route path={"/create"} element={<CreateCourse />} />
                    <Route path={"/catalog/:courseId"} element={<DetailsCourse />} />
                    <Route path={"/language-catalog"} element={<LanguageCatalog />} />


                    <Route path={"/catalog/:courseId/edit"} element={
                      <IsOwnerCourse>
                        <EditCourse />
                      </IsOwnerCourse>
                    } />


                    <Route path={"/forum"} element={<ForumStudents />} />
                    <Route path={"/forum/:forumId"} element={<ForumDetails />} />

                    <Route path={"/forum/:forumId/edit"} element={
                      <IsOwnerCourse>
                        <EditForumPost />
                      </IsOwnerCourse>
                    } />



                    <Route path={"/add-new-post"} element={<AddForumPost />} />

                    <Route path={"/profile"} element={<ProfilePage />} />

                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/my-added-courses" element={<AddedCourses />} />
                    <Route path="/favorite-courses" element={<FavoriteCourses />} />
                    <Route path="/change-avatar" element={<AvatarHeader />} />


                  </Route>
                  {/* End RouteGuard */}

                  <Route path={"/404/*"} element={<PageNotFound />} />
                  <Route path={"*"} element={<PageNotFound />} />

                </Routes>

                {!isAdminPage &&
                  <Suspense fullback={<IsLoading />}>
                    <ChatBox />
                  </Suspense>
                }

                {/* {!isProfilePage && <Footer />} */}


                <Routes>
                  <Route path={"/admin"} element={
                    <IsAdmin>
                  <AdminPage />
                  </IsAdmin>
                  } />
                </Routes>
              </ErrorBoundary>
            </ForumProvider>
          </CourseProvider>
        </UserProvider>
      </Provider>
    </>
  )
}

export default App
