import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import NavBar from '../Navigation';
import { jwtDecode } from "jwt-decode";

import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider, Select, MenuItem } from '@mui/material';

const serverURL = '';

const SignUp = () => {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState("");
  const [studentNum, setStudentNum] = useState(null);
  const [display, setDisplay] = useState(false);


  const handleGoogleLogin = (userInfo) => {
    console.log('User info:', userInfo);
    setUserData(userInfo);
    console.log(userData.given_name);
  };

  const handleStudnetNumberChange = (e) => {
    setStudentNum(e.target.value);
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay(true);
    console.log('Submitting:', userData);

    const userInfo = {
      // name: `${userData.given_name} ${userData.family_name}`,
      // email: userData.email,
      // role: role,
      // studentNum: studentNum
      name: "test",
      email: "test@gmail.com",
      role: "student",
      studentNum: "20935366"

    };

    callApiAddUser(userInfo)
        .then(res => {
          console.log('callApiAddUser response: ', res);
        })
        .catch(error => {
          console.error('Error adding user:', error.message);
        });
  };

  const callApiAddUser = async requestBody => {
    const url = serverURL + '/api/addUser';
    console.log('Sending user data to:', url);
    console.log(requestBody)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const body = await response.json();
    console.log("body", body);

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="xs">
        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p  style={{ margin: '20px' }}>Sign up with Google</p>
          
          <GoogleLogin
            onSuccess = {credentialResponse => {
              if (credentialResponse.credential != null) {
               const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
               handleGoogleLogin(USER_CREDENTIAL);
              }
             }
            }
            onFailure={(error) => console.log('Google login failed:', error)}
          >
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
                <Typography variant="subtitle1">Name:  {userData.given_name} {userData.family_name} </Typography>
                <Typography variant="subtitle1">Email: {userData.email}</Typography>
                <Typography variant="subtitle1">Role: {role}</Typography>
                <Typography variant="subtitle1">Student Number: {studentNum}</Typography>
                
              </Box>
            )}
          

        </Box>
      </Container>
    </div>
  );
};

export default SignUp;

