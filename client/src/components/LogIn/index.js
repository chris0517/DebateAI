import React, { useState, useContext} from 'react';

import { Select, MenuItem,Grid, TextField, Button, Container, Typography, Box, createTheme, ThemeProvider} from '@mui/material';
import NavBar from '../Navigation';
import { withFirebase } from '../Firebase'; // Import Firebase context and HOC
import Firebase from '../Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

import { AuthContext } from '../Firebase/authContext';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { login, selectUserData } from '../../redux/reducers/userSlice';


const serverURL = "";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSuccess = (response) => {
    // Handle successful login
    console.log('Login Success:', response);
  };

  const handleLoginFailure = (error) => {
    // Handle failed login
    console.error('Login Failed:', error);
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  };


  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
      const result = await signInWithPopup(Firebase.auth, provider); // Sign in with Google popup      
      const user = result.user;
  
      const idToken = await user.getIdToken();  
      const uid = user.uid;
      setEmail(user.email);
      const providerId = user.providerId;
      handleLoginSuccess(result);
    } catch (error) {
      console.error('Google login failed:', error);
      // Handle the error and return an error message to the user
      handleLoginFailure(error);
    }
  };

  //Store login info in Redux
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(email);
    loadUser(); // Wait for loadUser() to finish before proceeding

  };



  const loadUser = () => {
    callretrieveUser()
      .then(res => {
        console.log("callretrieveUser returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callretrieveUser parsed: ", parsed);
        if (parsed.length === 0) {
          console.error("Empty or invalid response from server");
          setErrorMessage("Email not found, please sign up first");
          Firebase.doSignOut();

          return;
        }else (
          setErrorMessage("")
        )
        
        const userData = {
          name: parsed[0].Name,
          email: parsed[0].Email,
          number: parsed[0].StudentNumber,
          roles: role, 
        };

        dispatch(login(userData)).then(() => {
          if (errorMessage === "") {
            navigate('/profile');
          }
        }
        );
      })
  }

  const callretrieveUser = async () => {
    const url = serverURL + "/api/retrieveUser";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email, role: role})

    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };

  
  return (
    
    <div style = {{padding: '20px'}}>
      <NavBar />
       <Container maxWidth="xs">
        <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h4' >            
            Log in
          </Typography>


          <Button style={{margin: '10px'}} id="login" variant="contained" onClick={handleGoogleLogin} >Log In With Google</Button>
          
          {email && (
              <Typography style = {{margin: '10px'}} className="user-name">Email Authenticated: {email}</Typography>
            )}

          <form onSubmit={handleLogin}  style={{ margin: '10px', width: '60%' }}>
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
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
            {role != "" && (
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                Sign In
              </Button>
              )
            }            
          </form>

          {errorMessage && 
            <div>
              <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
              <Button></Button>
            </div>
            }

        </Box>
      </Container>

    </div>

  );
};

export default LogIn;


  