// import { useState,useEffect } from 'react'
import { useEffect, useState, lazy, Suspense } from 'react'
import { Route, Router, Routes, useLocation } from 'react-router-dom'
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

import { CourseProvider } from './components/contexts/CourseContext'

import { RouteGuard } from './components/common/RouteGuard'
import { PageNotFound } from './components/404/PageNotFound'
import { GuardLoginRegister } from './components/common/GuardLoginRegister'

// import { ChatBox } from './components/ChatBox/ChatBox'

const ChatBox = lazy(() => import('./components/ChatBox/ChatBox'))
// import { AdminChatPage } from './components/AdminPage/AdminChatPage'
import { IsLoading } from './components/IsLoading/IsLoading'
import { CookieConsent } from './components/CookieConsent/CookieConsent'
import { PrivacyPolicy } from './components/CookieConsent/PrivacyPolicy'

import { SearchPage } from './components/SearchPage/SearchPage'

import { ForumProvider } from './components/contexts/ForumContext'

import { TermsAndConditions } from './components/Footer/TermsAndConditions/TermsAndConditions'

import AdminRoutes from './Routes/AdminRoutes'
import HomeRoutes from './Routes/HomeRoutes'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const [cookies] = useCookies(["cookieConsent"]);
  // console.log("cookie", cookies)
  useEffect(() => {
    setIsLoading(false)

  }, [])

  const location = useLocation(); // Get the current location

  // const isProfilePage = location.pathname.startsWith('/profile') || location.pathname.startsWith("/change-password")




  const isAdminPage = location.pathname.startsWith('/admin')


  return (

    <>
       {isLoading && <IsLoading />} 
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
                      <Home />
                    </Suspense>
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
                  
                      <Route path="/*" element={<HomeRoutes />} />
                   
                

                    <Route path="/admin/*" element={<AdminRoutes />} />
            

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



              </ErrorBoundary>
            </ForumProvider>
          </CourseProvider>
        </UserProvider>
      </Provider>
    </>
  )
}

export default App
