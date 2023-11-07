
import './ProfileSidebar.css'
import { Link } from 'react-router-dom'
export const ProfileSidebar=()=>{

    return(
        <div className="profile-sidebar">
        <div className="sidebar-header">
          <h3>Profile Settings</h3>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/change-password">Change Password</Link>
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
            <a href="/change-photo">Change Profile Photo</a>
          </li>
        </ul>
      </div>
    )
}