import React, {useContext, useState} from 'react';
import {
  Divider,
  ListItemIcon,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {Settings, Logout} from '@mui/icons-material';

import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../Firebase/authContext';
import Firebase from '../Firebase';

import {login, selectUserData, logout} from '../../redux/reducers/userSlice';
import store from '../../redux/store'; // Import the Redux store
import {useSelector} from 'react-redux';
import {current} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentUser} = useContext(AuthContext);
  const user = useSelector(selectUserData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    navigate('/login');

    Firebase.doSignOut();

    const userData = {
      name: '',
      email: '',
      number: '',
      roles: '',
    };

    dispatch(logout());
  };
  const handleProfile = () => {
    navigate('/profile');
    setAnchorEl(null);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar style={{background: '#FFFFFF'}} position="static">
        <Toolbar>
          <Typography
            color="black"
            variant="h6"
            component="div"
            sx={{flexGrow: 1}}
            onClick={() => navigate('/')}
          >
            DebateAI
          </Typography>

          <Button color="inherit">
            <Link
              id="topics-link"
              color="inherit"
              style={{
                textDecoration: 'inherit',
                cursor: 'pointer',
                textTransform: 'none',
              }}
              onClick={() => navigate('/')}
            >
              <Typography variant="h6" color="Black">
                Topics
              </Typography>
            </Link>
          </Button>

          <Button color="inherit">
            <Link
              id="history-link"
              color="inherit"
              style={{
                textDecoration: 'inherit',
                cursor: 'pointer',
                textTransform: 'none',
              }}
              onClick={() => navigate('/history')}
            >
              <Typography variant="h6" color="Black">
                History
              </Typography>
            </Link>
          </Button>

          <Button color="inherit">
            <Link
              color="inherit"
              style={{
                textDecoration: 'inherit',
                cursor: 'pointer',
                textTransform: 'none',
              }}
              onClick={() => navigate('/classroom')}
            >
              <Typography variant="h6" color="Black">
                Classroom
              </Typography>
            </Link>
          </Button>

          <div className="user-info">
            {user.loggedIn && currentUser ? (
              <div className="user-info" style={{marginLeft: 10}}>
                <Avatar
                  src={currentUser.photoURL}
                  alt="User Profile"
                  className="user-profile"
                  style={{
                    width: '40px', // Adjust size as needed
                    height: '40px', // Adjust size as needed
                    borderRadius: '50%', // Makes the image circular
                    cursor: 'pointer', // Make the image clickable
                  }}
                  onClick={handleClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                  <MenuItem onClick={handleProfile}>
                    <Avatar /> Profile
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <Logout fontsize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button color="inherit">
                  <Link
                    color="inherit"
                    style={{
                      textDecoration: 'inherit',
                      cursor: 'pointer',
                      textTransform: 'none',
                    }}
                    onClick={() => navigate('/login')}
                  >
                    <Typography variant="h6" color="Black">
                      Log In
                    </Typography>
                  </Link>
                </Button>

                <Button color="inherit">
                  <Link
                    color="inherit"
                    style={{
                      textDecoration: 'inherit',
                      cursor: 'pointer',
                      textTransform: 'none',
                    }}
                    onClick={() => navigate('/signup')}
                  >
                    <Typography variant="h6" color="Black">
                      Sign Up
                    </Typography>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
