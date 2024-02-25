import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import NavBar from '../Navigation';
import { jwtDecode } from "jwt-decode";

import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider, Select, MenuItem } from '@mui/material';

const SignUp = () => {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState("");
  const [display, setDisplay] = useState(false);


  const handleGoogleLogin = (userInfo) => {
    console.log('User info:', userInfo);
    setUserData(userInfo);
    console.log(userData.given_name);
  };
  const handleStudnetNumberChange = (e) => {
    
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay(true);
    console.log('Submitting:', userData);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="xs">
        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p  style={{ margin: '20px' }}>Sign up with Google:</p>
          
          <GoogleLogin
            clientId="YOUR_CLIENT_ID"
            onSuccess = {credentialResponse => {
              if (credentialResponse.credential != null) {
               const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
               handleGoogleLogin(USER_CREDENTIAL);
              }
             }
            }
            onFailure={(error) => console.log('Google login failed:', error)}
          >
            <button>Sign up with Google</button>
          </GoogleLogin>


          <form onSubmit={handleSubmit}  style={{ marginTop: '20px', width: '60%' }}>
            <Select
              margin="normal"
              fullWidth
              value={role}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
              name="role"
              id="role"
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            {role === 'student' && (
              <TextField
                margin="normal"
                fullWidth
                id="studentNumber"
                label="Student Number"
                name="studentNumber"
                onChange={handleStudnetNumberChange}
                variant="outlined"
              />
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Sign Up
            </Button>
            
          </form>

          
          {display && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="subtitle1">Name: {userData.given_name} {userData.family_name} </Typography>
                <Typography variant="subtitle1">Email: {userData.email}</Typography>
              </Box>
            )}
          

        </Box>
      </Container>
    </div>
  );
};

export default SignUp;

