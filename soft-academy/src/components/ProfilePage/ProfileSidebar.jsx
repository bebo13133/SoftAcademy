
import './ProfileSidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';




export const ProfileSidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, 760); // Променете времето според вашите предпочитания

    return () => clearTimeout(timeoutId);
  }, []);

  const onNavigateAddCourse = () => {
    navigate("/my-added-courses")
  }
  const onNavigateFavoriteCourse = () => {
    navigate("/favorite-courses")
  }
  const onChangeAvatar = () => {
    navigate("/change-avatar")
  }
  const onChangeTrainingCourses = () => {
    navigate('/training-courses')
  }
  const onChangePassword = () => {
    navigate('/change-password')
  }
  return (
    <>
      <div className={`profile-sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="sidebar-header">
          <h3>Profile menu</h3>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button className="close-button3" onClick={(onChangePassword)}>Change Password</button>
          </li>
          <li>
            <button className="close-button3" onClick={(onNavigateAddCourse)}>Added Courses</button>
          </li>
          <li>
            <button className="close-button3" onClick={(onNavigateFavoriteCourse)}>Favorite Courses</button>
          </li>
          <li>
            <button className="close-button3" onClick={(onChangeTrainingCourses)}>Training Courses</button>
          </li>
          <li>
            <button className="close-button3" onClick={(onChangeAvatar)}>Change Photo</button>
          </li>
        </ul>
        <ul>
          <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
        </ul>
      </div>
    </>
  )
}