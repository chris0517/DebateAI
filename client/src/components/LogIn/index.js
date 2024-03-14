import React, { useState, useContext} from 'react';

import { Grid, TextField, Button, Container, Typography, Box, createTheme, ThemeProvider} from '@mui/material';
import NavBar from '../Navigation';
import { withFirebase } from '../Firebase'; // Import Firebase context and HOC
import Firebase from '../Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { AuthContext } from '../Firebase/authContext';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const LogIn = () => {
  const { currentUser } = useContext(AuthContext);

 
  const handleLoginSuccess = (response) => {
    // Handle successful login
    console.log('Login Success:', response);
  };

  const handleLoginFailure = (error) => {
    // Handle failed login
    console.error('Login Failed:', error);
  };

  
  // Function to check if user exists in Realtime Database
  const checkIfEmailExists = async (email) => {
    try {
      const firestore = getFirestore(); // Get Firestore instance
      const usersCollectionRef = collection(firestore, 'users'); // Reference to 'users' collection
      const emailQuery = query(usersCollectionRef, where('email', '==', email)); // Query for documents with matching email
      const querySnapshot = await getDocs(emailQuery); // Get query snapshot
      console.log(querySnapshot)
      return !querySnapshot.empty; // Return true if documents with matching email exist, false otherwise
    } catch (error) {
      console.error('Error checking if email exists:', error);
      throw error; // Propagate the error
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
      const result = await signInWithPopup(Firebase.auth, provider); // Sign in with Google popup      
      const user = result.user;
  
      const userExists = await checkIfEmailExists(user.email); // Replace this with your own implementation
  
      if (!userExists) {
        // If the user does not exist, return an error
        console.log("dont exist")
        throw new Error('User does not exist in the database');
      }
  
      // Continue with login process
      // Get the current user's ID token
      const idToken = await user.getIdToken();
      console.log('Encoded Token:', idToken);
  
      const uid = user.uid;
      const email = user.email;
      const providerId = user.providerId;
  
      console.log('User Info:');
      console.log('UID:', uid);
      console.log('Email:', email);
      console.log('Provider ID:', providerId);
  
      // Continue with any other actions after successful login
      handleLoginSuccess(result);
    } catch (error) {
      console.error('Google login failed:', error);
      // Handle the error and return an error message to the user
      handleLoginFailure(error);
    }
  };
  
  return (
    
    <div style = {{padding: '20px'}}>
      <NavBar />
       <Container maxWidth="xs">
        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography margin="normal" component="h1" variant="h5" color='#000'>
            Log in
          </Typography>
          {currentUser ? (
              <Typography className="user-name">{currentUser.displayName}</Typography>
            ) : (
              <Typography className="login-link">No User</Typography>
            )}
          <Button variant="contained" onClick={handleGoogleLogin}>Log In With Google</Button>
        </Box>
      </Container>

    </div>

  );
};

export default LogIn;


  