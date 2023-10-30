// import { useState,useEffect } from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
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



function App() {

  useEffect(() => {

  }, [])



  return (
    <>
      <UserProvider>
        <CourseProvider>
        <Header />
        <Routes>   
          <Route path={"/"} element={<Home />} />
          <Route path={"/catalog"} element={<CatalogCourses />} />
          <Route path={"/reviews"} element={<StudentReview />} />
          <Route path={"/blog"} element={<Blog />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/logout"} element={<Logout />} />
          <Route path={"/create"} element={<CreateCourse />} />
          <Route path={"/catalog/:courseId"} element={<DetailsCourse />} />

        </Routes>

        <Footer />
        </CourseProvider>
      </UserProvider>
    </>
  )
}

export default App
