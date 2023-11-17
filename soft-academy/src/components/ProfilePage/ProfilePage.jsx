import { Route, Routes } from "react-router-dom"
import { ProfileSidebar } from "./ProfileSidebar"

import { ChangePassword } from "./ChangePassword";




export const ProfilePage = () => {




    return (

        <div className="profile-page">
           
            <div className="profile-content">
    <h1 className="profile-sidebar-h1">Choice option from Menu </h1>
         
            </div>
            <ProfileSidebar />
        </div>
    )
}