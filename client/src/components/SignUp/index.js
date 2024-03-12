import React, { useEffect, useState } from 'react';
import NavBar from '../Navigation';
import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider, Select, MenuItem } from '@mui/material';
import { withFirebase } from '../Firebase'; // Import Firebase context and HOC
import Firebase from '../Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const serverURL = '';


const SignUp = () => { // Destructure firebase from props
    const [userData, setUserData] = useState({});
    const [role, setRole] = useState("");
    const [studentNum, setStudentNum] = useState(null);
    const [display, setDisplay] = useState(false);
    const [success, setSuccess] = useState(false);


  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
      const result = await signInWithPopup(Firebase.auth, provider); // Sign in with Google popup      const user = result.user;
      //setUserData.name(result.user.name);
      //setUserData.email(result.user.email);
      setUserData({ name: result.user.displayName, email: result.user.email});
      console.log(result.user);
      console.log(userData.name);
    } catch (error) {
      console.error('Google login failed:', error);
    }
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
        name: userData.name,
        email: userData.email,
        role: role,
        studentNum: studentNum
      };

      callApiAddUser(userInfo)
          .then(res => {
            console.log('callApiAddUser response: ', res);
          })
          .catch(error => {
            console.error('Error adding user:', error);

          });
    };

    const callApiAddUser = async requestBody => {
      const url = serverURL + '/api/addUser';
      console.log('Sending user data to:', url);
      console.log(requestBody)

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
    
        const body = await response.json();
        console.log("body", body);
    
        if (response.status !== 200) {
          throw Error(body.error); // Throw the error received from the API
        }
        return body;
      } catch (error) {
        // Check if the error message indicates a duplicate entry error
        if (error.message.includes("ER_DUP_ENTRY")) {
          // Display error message on the webpage
          alert("Error: This email is already registered.");
        } else {
          // For other errors, display the error message received from the API
          alert(error.message);
        }
      }

    };
  return (
    <div>
      <NavBar />
      <Container maxWidth="xs">
        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ margin: '20px' }}>Sign up with Google</p>

          <Button variant="contained" onClick={handleGoogleLogin}>Sign Up With Google</Button>
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
          
          
          {success && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant>Successfully signed in as:</Typography>
                <Typography variant="subtitle1">Name:  {userData.given_name} {userData.family_name} </Typography>
                <Typography variant="subtitle1">Email: {userData.email}</Typography>
                {display && (
                  <Box sx={{ marginTop: 0}}>
                    <Typography variant="subtitle1">Role: {role}</Typography>
                    {role === 'student' && (
                      <Typography variant="subtitle1">Student Number: {studentNum}</Typography>
                    )}
                  </Box>
                )}
            </Box>
          )}
        
        </Box>
      </Container>
    </div>
  );
};

export default withFirebase(SignUp); // Wrap component with withFirebase HOC
