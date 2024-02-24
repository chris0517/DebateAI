import * as React from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../Navigation';

//import BackgroundImage from "./backgroundImage.jpg"

const serverURL = '';

const LogIn = () => {
  return (
    <div style={{padding: '20px'}}>
      <NavBar />
      <Grid container spacing={3} padding={3}>
        <Typography color="#FFFFFF">Login Page</Typography>
      </Grid>
    </div>
  );
};

export default LogIn;
