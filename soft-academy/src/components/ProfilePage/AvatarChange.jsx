import { useState } from "react"
import { ProfileSidebar } from "./ProfileSidebar"
import "./changeAvatar.css"


export const AvatarChange =({ 
    currentAvatar,
     onAvatarChange 
    })=>{

const [newAvatar,setNewAvatar]= useState(null)

const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (newAvatar) {
      onAvatarChange(newAvatar);
      setNewAvatar(null);
    }
  };

return(
<>
{/* <ProfileSidebar/> */}

    <div className="avatar-change-container">
      <img src={newAvatar || currentAvatar} alt="Avatar" className="avatar-preview" />
      <input type="file" accept="image/*" onChange={handleAvatarChange} className="avatar-input" />
      <label className="avatar-upload-label" htmlFor="avatar-input">Upload New Avatar</label>
      <button onClick={handleSaveAvatar} className="avatar-save-button">Save Avatar</button>
    </div>
    </>
)

}