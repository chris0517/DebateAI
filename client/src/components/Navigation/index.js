import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#FFFFFF' }} position="static">
        <Toolbar>
              <Typography color="black" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                DebateAI
              </Typography>


          <Button color="inherit">
            <Link
                  color="inherit"
                  style={{ textDecoration: 'inherit', cursor: "pointer", textTransform: 'none' }}
                  onClick={() => navigate('/')}
              >
                  <Typography variant="h6"color="Black">
                      Landing
                  </Typography>
            </Link>
          </Button>


          <Button color="inherit">
            <Link
                  color="inherit"
                  style={{ textDecoration: 'inherit', cursor: "pointer", textTransform: 'none' }}
                  onClick={() => navigate('/Classroom')}
              >
                  <Typography variant="h6"color="Black">
                      Classroom
                  </Typography>
            </Link>
          </Button>

          <Button color="inherit">
            <Link
                  color="inherit"
                  style={{ textDecoration: 'inherit', cursor: "pointer", textTransform: 'none' }}
                  onClick={() => navigate('/login')}
              >
                  <Typography variant="h6"color="Black">
                      Log in
                  </Typography>
            </Link>
          </Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
