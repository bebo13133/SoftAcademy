
import './ProfileSidebar.css'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';




export const ProfileSidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, 300); // Променете времето според вашите предпочитания

    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <>
      <div className={`profile-sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="sidebar-header">
          <h3>Profile </h3>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/change-password" >Change Password</Link>
          </li>
          <li>
            <Link to="/my-added-courses">Added Courses</Link>
          </li>
          <li>
            <a href="/favorite-courses">Favorite Courses</a>
          </li>
          <li>
            <a href="/change-username">Change Username</a>
          </li>
          <li>
            <a href="/change-avatar">Change Profile Photo</a>
          </li>
        </ul>
      </div>
    </>
  )
}