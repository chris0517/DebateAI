import * as React from 'react';
import {Box, Grid} from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from '../Landing';
import LogIn from '../LogIn';
import Classroom from '../Classroom';
import SignUp from '../SignUp';
import Chat from '../Chat';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  return (
    <GoogleOAuthProvider clientId="990000531059-kfc3o2bo6rvj4mmnqbc8dkcmqj50kknb.apps.googleusercontent.com">
    <div>
      <Grid>
        <Box sx={{width: '100%', height: '100vh'}}>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Router>
        </Box>
      </Grid>
    </div>
    </GoogleOAuthProvider>

  );
};
export default App;
