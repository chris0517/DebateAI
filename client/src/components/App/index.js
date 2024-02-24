import * as React from 'react';
import {Box, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import LogIn from '../LogIn';
import Classroom from '../Classroom';
import SignUp from '../SignUp';





const App = () => {


  return (
      <div>
        <Grid>
          <Box 
            sx={{  width: '100%',
            height: 10500, backgroundColor: '#282828'}}>
            <Router>
              <div>
                <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/classroom" element={<Classroom />} />

                </Routes>
              </div>
            </Router>
            


          </Box>
        </Grid>
        
      </div>

    

  );
}
export default App;
