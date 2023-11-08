import { useState } from "react"

import * as ResponsiveUserBar from '../ResponsiveUserBar'
// import {fetchUserLastAvatar} from "../tools/fetchUserlastAvatar"
import "./changeAvatar.css"
import { storage } from "../config/firebase-config"
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from 'uuid'
import { useAuthContext } from "../contexts/UserContext"
export const AvatarChange = ({
    // currentAvatar,
    // onAvatarChange
}) => {

    const [newAvatar, setNewAvatar] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)

    const { userId,updateAvatarUrl  } = useAuthContext()


    const handleAvatarChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            const localUrl = URL.createObjectURL(file);
            setNewAvatar(localUrl);
        }

    }


    const handleSaveAvatar = () => {
        if (avatarUrl == null) return;

        const avatarImagesRef = ref(storage, `avatarImages/${userId}`)
        uploadBytes(avatarImagesRef, avatarUrl)
            .then(() => {
                alert("Image uploaded")
            })
            updateAvatarUrl(newAvatar)  //сетвам новата снимка през контекста ,за да може в реално време да се смени !!!
    }



    return (
        <>


            <div className="avatar-change-container">
                <img src={newAvatar || "./img/avatar-user.png"} alt="Avatar" className="avatar-preview" />
                <input type="file" accept="image/*" onChange={(e) => {
                    handleAvatarChange(e)
                    setAvatarUrl(e.target.files[0])
                }}  // вторият сетва стайта който ще изпратя като заявка 
                    className="avatar-input" />
                {/* <label className="avatar-upload-label" htmlFor="avatar-input">Upload New Avatar</label> */}
                <button onClick={handleSaveAvatar} className="avatar-save-button">Save Avatar</button>
            </div>
        </>
    )

}