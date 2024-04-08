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
    const [classCode, setClassCode] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
      const result = await signInWithPopup(Firebase.auth, provider); // Sign in with Google popup      const user = result.user;
      //setUserData.name(result.user.name);
      //setUserData.email(result.user.email);
      
      setUserData({ name: result.user.displayName, email: result.user.email});
      setSuccess(true);
      console.log(result.user);
      console.log(userData.name);
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

    const handleStudnetNumberChange = (e) => {
      setStudentNum(e.target.value);
    };
    const handleClassChange = (e) => {
      setClassCode(e.target.value);
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
        studentNum: studentNum,
        classCode: classCode
      };
      console.log(userInfo)
      callApiAddUser(userInfo)
          .then(res => {
            console.log('callApiAddUser response: ', res);
            var parsed = JSON.parse(res.express);
            console.log(parsed)
            if(parsed.affectedRows === 0){
              alert("Classroom code not found, please enter a valid classroom code!")
            }else{
              alert("Sign Up Successful!");
            }
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


        if (response.status !== 200) {
          throw Error(body.error); // Throw the error received from the API
        }
        
        const body = await response.json();
        console.log("body", body);
        return body;
      } catch (error) {
        // Check if the error message indicates a duplicate entry error
        if (error.message) {
          // Display error message on the webpage
          alert("Error: This email is already registered.");
          Firebase.doSignOut();
        }
      }

    };
  return (
    <div style = {{padding: '20px'}}>
      <NavBar />
       <Container maxWidth="xs">
        <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h4' >  Sign up</Typography>

          {success ? (
            <>
            <Typography style = {{margin: '10px'}} className="user-name">Email Authenticated: {userData.email}</Typography>
            <form onSubmit={handleSubmit}  style={{ marginTop: '10px', width: '60%' }}>
            <Select
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
             <MenuItem value="Student">Student</MenuItem>
             <MenuItem value="Teacher">Teacher</MenuItem>
           </Select>
           {role === 'Student' && (
             <>
             <TextField
               margin="normal"
               fullWidth
               id="studentNumber"
               label="Student Number"
               name="studentNumber"
               onChange={handleStudnetNumberChange}
               variant="outlined"
             />
             <TextField
               margin="normal"
               fullWidth
               id="classRoom"
               label="Classroom Number"
               name="classRoom Number"
               onChange={handleClassChange}
               variant="outlined"
             />
             </>
           )}
           {role != "" && (
             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
               Sign Up
             </Button>
             )
           } 
         </form>
         </>  
        ) : (
          <Button variant="contained" style={{ margin: '10px' }} onClick={handleGoogleLogin}>Sign Up With Google</Button>
        )}
       </Box>
      </Container>
    </div>
  );
};

export default withFirebase(SignUp); // Wrap component with withFirebase HOC
