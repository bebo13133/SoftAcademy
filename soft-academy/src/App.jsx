// import { useState,useEffect } from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
// import './App.css'
import { Blog } from './components/Blog/Blog'
import { CatalogCourses } from './components/CatalogCourses/CatalogCourses'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Home } from './components/Home/Home'
import { StudentReview } from './components/StudentsReview/StudentReview'
import { Contact } from './components/Contact/Contact'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { UserProvider } from './components/contexts/UserContext'
import { useContext } from 'react'
import { Logout } from './components/Logout/Logout'
import { CreateCourse } from './components/CreateCourse/CreateCourse'
import { CourseProvider } from './components/contexts/CourseContext'
import { DetailsCourse } from './components/DetailsCourse/DetailsCourse'
import { RouteGuard } from './components/common/RouteGuard'
import { PageNotFound } from './components/404/PageNotFound'
import { GuardLoginRegister } from './components/common/GuardLoginRegister'
import { EditCourse } from './components/EditCourse/EditCourse'
import { IsOwnerCourse } from './components/common/isOwnerCourse'
function App() {

  useEffect(() => {

  }, [])



  return (
    <>

      <UserProvider>
        <CourseProvider>
          <ErrorBoundary>
            <Header />
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/catalog"} element={<CatalogCourses />} />
              <Route path={"/reviews"} element={<StudentReview />} />
              <Route path={"/blog"} element={<Blog />} />
              <Route path={"/contact"} element={<Contact />} />

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
                <Route path={"/catalog/:courseId/edit"} element={
                  <IsOwnerCourse>
                <EditCourse />
                </IsOwnerCourse>
                } />

              </Route>
              {/* End RouteGuard */}

              <Route path={"/404"} element={<PageNotFound />} />
            </Routes>

            <Footer />
          </ErrorBoundary>
        </CourseProvider>
      </UserProvider>
    </>
  )
}

export default App
