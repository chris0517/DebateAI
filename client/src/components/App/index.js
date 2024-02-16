import * as React from 'react';
import {Box, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';


const App = () => {


  return (
      <div>
        <Grid>
          <Box 
            sx={{  width: '100%',
            height: 10500, backgroundColor: '#000'}}>
            <Router>
              <div>
                <Routes>
                <Route path="/" element={<Landing />} />
                {/* <Route path="/Search" element={<Search />} /> */}
                </Routes>
              </div>
            </Router>



          </Box>
        </Grid>
        
      </div>

    

  );
}
export default App;
