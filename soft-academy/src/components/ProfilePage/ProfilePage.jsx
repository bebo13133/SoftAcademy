import { Route, Routes } from "react-router-dom"
import { ProfileSidebar } from "./ProfileSidebar"

import { ChangePassword } from "./ChangePassword";




export const ProfilePage = () => {




    return (

        <div className="profile-page">
           
            <div className="profile-content">
                {/* <Routes>
                    <Route path="/change-password" element={<ChangePassword />} /> */}
                    {/* <Route path="/change-username" component={ChangeUsername} />
                    <Route path="/change-photo" component={ChangePhoto} /> */}
                {/* </Routes> */}
            </div>
            <ProfileSidebar />
        </div>
    )
}