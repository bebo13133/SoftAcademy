import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import './responsiveUserBar.css'




import { AvatarChange } from "./ProfilePage/AvatarChange";
import { storage } from "./config/firebase-config";
import { useAuthContext } from "./contexts/UserContext";
import { IsLoading } from "./IsLoading/IsLoading";



// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ["Profile", "Settings", "Logout"];

export const ResponsiveUserBar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(false);
  console.log("anchorElUser",anchorElUser)
  const [avatars, setAvatar] = useState([]);
  const [urlAvatar, setUrlAvatar] = useState([]);
const [isLoading,setIsLoading] = useState(true);
  const { userId, avatarUrl} = useAuthContext()
// console.log("avatar",avatarUrl)
  const avatarImageList = ref(storage, `avatarImages/`)
  const menuRef = useRef(null);

 const fetchUserLastAvatar = (userId) => {
    listAll(avatarImageList)
      .then((response) => {
        const userAvatarItems = response.items.filter((item) => item.name.startsWith(userId));
        if (userAvatarItems.length > 0) {
          const lastUserAvatarItem = userAvatarItems[userAvatarItems.length - 1];
          getDownloadURL(lastUserAvatarItem).then((url) => {
            setAvatar((prevAvatar) => {
         
              return[ prevAvatar.filter((avatar) => avatar.userId === userId), { userId, url }];
            });
          });
        }
      });
  };


  useEffect(() => {
    fetchUserLastAvatar(userId);

setIsLoading(false)
  }, [userId]);

  const urlAv = (avatars.map(avatar => avatar.url))
  // setUrlAvatar(urlAv);








  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(true);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(false);
  // };
  // const handleAvatarClick = () => {
  //   console.log("hi")
  //   handleCloseUserMenu();
  // };

  const handleToggleUserMenu = (event) => {
    setAnchorElUser((prevAnchor) =>
      prevAnchor ? false : true
    );
  };


  const handleLogout = () => {
    navigate('/logout', { replace: true });
    handleToggleUserMenu()
  };
  const handleProfile = () => {
    navigate('/profile', { replace: true });
    handleToggleUserMenu()
  };
  const handleSettings = () => {
    navigate('/settings', { replace: true });
    handleToggleUserMenu()
  };



  // export { fetchUserLastAvatar };
  // useEffect(() => {
  //   if (!anchorElUser) {
  //     handleCloseUserMenu();
  //   }
  // }, [anchorElUser]);
  return (
    <>
    {isLoading&& <IsLoading/>}
    <div className="user-bar-container">
        <button
          onClick={handleToggleUserMenu}
          className="user-avatar-button"
        >
          <img
            alt="User Avatar"
            src={avatarUrl || urlAv[1] || "/img/avatar-user.png"}
            className="user-avatar"
          />
        </button>
        {Boolean(anchorElUser)&& (
          <div className="user-menu">
            {settings.map((setting) => (
              <button
                key={setting}
                onClick={() =>
                  setting === "Profile"
                    ? handleProfile()
                    : setting === "Settings"
                    ? handleSettings()
                    : setting === "Logout"
                    ? handleLogout()
                    : handleCloseUserMenu()
                }
                className="menu-item"
              >
                {setting}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


