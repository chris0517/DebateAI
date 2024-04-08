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
  const [authenticated, setAuthenticated] = useState(false); // Track authentication status

  const handleLoginSuccess = (response) => {
    // Handle successful login
    console.log('Login Success:', response);
    setAuthenticated(true); // Set authenticated to true upon successful login
  };

  const handleLoginFailure = (error) => {
    // Handle failed login
    console.error('Login Failed:', error);
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
      const result = await signInWithPopup(Firebase.auth, provider); // Sign in with Google popup      
      const user = result.user;
  
      let idToken = "";
      const userIDToken = await Firebase.doGetIdToken();

      localStorage.setItem("currentUserID", userIDToken);

      console.log("Currently stored in localstorage", localStorage.getItem("currentUserID"))

      setEmail(user.email);
      const providerId = user.providerId;
      handleLoginSuccess(result);
      
    } catch (error) {
      console.error('Google login failed:', error);
      // Handle the error and return an error message to the user
      handleLoginFailure(error);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(email);
    console.log(localStorage.getItem("currentUserID"))
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
          roles: parsed[0].Role, 
          classroomID: parsed[0].ClassroomID,
        };

        dispatch(login(userData))
        if (errorMessage === "") {
          navigate('/profile');
        }       
      })
  }

  const callretrieveUser = async () => {
    const url = serverURL + "/api/login";
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

          {!authenticated && (
            <Button style={{margin: '10px'}} id="login" variant="contained" onClick={handleGoogleLogin} >Log In With Google</Button>
          )}
          
          {(authenticated || email) && (
            <div>
              <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center" >
              <Typography style = {{margin: '10px'}} className="user-name">Email Authenticated: {email}</Typography>
              <Typography style = {{margin: '10px'}} >Constinue Log In?</Typography>

              <form onSubmit={handleLogin}  style={{ margin: '10px', width: '60%' }}>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                  Sign In
                </Button>
              </form>
              </Grid>
            </div>
          )}

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
