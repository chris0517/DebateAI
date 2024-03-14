import React, { useState, useContext} from 'react';

import { Select, MenuItem,Grid, TextField, Button, Container, Typography, Box, createTheme, ThemeProvider} from '@mui/material';
import NavBar from '../Navigation';
import { withFirebase } from '../Firebase'; // Import Firebase context and HOC
import Firebase from '../Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { AuthContext } from '../Firebase/authContext';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { login, selectUserData } from '../../redux/reducers/userSlice';


const serverURL = "";

const LogIn = () => {
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [registeredUser, setRegisteredUser] = useState(false);

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
    loadUser();
  };



  const loadUser = () => {
    callretrieveUser()
      .then(res => {
        console.log("callretrieveUser returned: ", res)
        if (!res || !res.express || !Array.isArray(res.express) || res.express.length === 0) {
          console.error("Empty or invalid response from server");
          // Handle the error or return early if necessary
          return;
        }

        var parsed = JSON.parse(res.express);
        console.log("callretrieveUser parsed: ", parsed[0]);
        
        const userData = {
          name: parsed[0].Name,
          email: parsed[0].Email,
          roles: role, 
        };

        dispatch(login(userData));
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
        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography margin="normal" component="h1" variant="h5" color='#000'>
            Log in
          </Typography>


          <Button style = {{margin: '20px'}}variant="contained" onClick={handleGoogleLogin}>Log In With Google</Button>
          
          {email && (
              <Typography className="user-name">Current log In: {email}</Typography>
            )}

          <form onSubmit={handleLogin}  style={{ marginTop: '20px', width: '60%' }}>
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
            {role != "" && (
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                Sign In
              </Button>
              )
            }
 
            
          </form>

        </Box>
      </Container>

    </div>

  );
};

export default LogIn;


  