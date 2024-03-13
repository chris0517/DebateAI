import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../Firebase/authContext';

// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar style={{background: '#FFFFFF'}} position="static">
        <Toolbar>
          <Typography
            color="black"
            variant="h6"
            component="div"
            sx={{flexGrow: 1}}
          >
            DebateAI
          </Typography>


          <Button color="inherit">
            <Link
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

          {/* <Button color="inherit">
            <Link
              color="inherit"
              style={{
                textDecoration: 'inherit',
                cursor: 'pointer',
                textTransform: 'none',
              }}
              onClick={() => navigate('/chat')}
            >
              <Typography variant="h6" color="Black">
                Chat
              </Typography>
            </Link>
          </Button> */}

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
                  style={{ textDecoration: 'inherit', cursor: "pointer", textTransform: 'none' }}
                  onClick={() => navigate('/signup')}
              >
                  <Typography variant="h6"color="Black">
                      Sign Up
                  </Typography>
            </Link>
          </Button>

          <div className="user-info">
            {currentUser ? (
              <img 
                src={currentUser.photoURL} 
                alt="User Profile" 
                className="user-profile" 
                style={{
                width: '40px', // Adjust size as needed
                height: '40px', // Adjust size as needed
                borderRadius: '50%' // Makes the image circular
              }}/>
              // <Typography color="Black" className="user-name">{currentUser.displayName}</Typography>
            ) : (
              <Typography className="login-link">Login</Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
