import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"



import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AvatarChange } from "./ProfilePage/AvatarChange";
import { storage } from "./config/firebase-config";
import { useAuthContext } from "./contexts/UserContext";
import { IsLoading } from "./IsLoading/IsLoading";



// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ["Profile", "Settings", "Logout"];

export const ResponsiveUserBar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatars, setAvatar] = useState([]);
  const [urlAvatar, setUrlAvatar] = useState([]);
const [isLoading,setIsLoading] = useState(true);
  const { userId, avatarUrl} = useAuthContext()
// console.log("avatar",avatarUrl)
  const avatarImageList = ref(storage, `avatarImages/`)


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
  console.log("urlAvatar", urlAv[1])







  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    navigate('/logout', { replace: true });
  };
  const handleProfile = () => {
    navigate('/profile', { replace: true });
  };
  const handleSettings = () => {
    navigate('/settings', { replace: true });
  };





  // export { fetchUserLastAvatar };

  return (
    <>
    {isLoading && <IsLoading/>}
    <AppBar position="static" style={{ boxShadow: 'none', backgroundColor: '#f1f1f1',}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

          
                <Avatar alt="Remy Sharp" src={avatarUrl || urlAv[1] || "/img/avatar-user.png"} style={{ width: 50, height: 50 }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Profile' ? handleProfile :
                  setting === 'Settings' ? handleSettings :
                    setting === 'Logout' ? handleLogout :
                      handleCloseUserMenu}>
                  <Typography textAlign="center" style={{fontSize:"1.4rem"}}>{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}


