import { useNavigate } from "react-router-dom";
import { useState } from "react";

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



// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ["Profile", "Settings", "Logout"];

export const ResponsiveUserBar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatar, setAvatar] = useState('./img/avatar-user.png');
  
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


  const handleAvatarChange = (newAvatar)=>{
    setAvatar(newAvatar)
  }

  return (
    <AppBar position="static" style={{ boxShadow: 'none', backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

              <AvatarChange currentAvatar={avatar} onAvatarChange={handleAvatarChange} alt="Remy Sharp"/>
                {/* <Avatar alt="Remy Sharp" src="./img/avatar-user.png" /> */}
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
                <MenuItem key={setting} onClick={  setting === 'Profile' ? handleProfile :
                setting === 'Settings' ? handleSettings :
                setting === 'Logout' ? handleLogout :
                handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}


