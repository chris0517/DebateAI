import * as React from 'react';
import {Box, Grid} from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from '../Landing';
import LogIn from '../LogIn';
import Classroom from '../Classroom';
import SignUp from '../SignUp';
import Chat from '../Chat';
import Profile from '../Profile';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Firebase, {FirebaseContext} from '../Firebase'
import { AuthProvider } from '../Firebase/authContext';


const App = () => {
  return (
    <AuthProvider>
      <FirebaseContext.Provider value={Firebase}>
      <div>
        <Grid>
          <Box sx={{width: '100%', height: '100vh'}}>
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/classroom" element={<Classroom />} />
                <Route path="/chat/:topic" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />

              </Routes>
            </Router>
          </Box>
        </Grid>
      </div>
      </FirebaseContext.Provider>
    </AuthProvider>

  );
};
export default App;
