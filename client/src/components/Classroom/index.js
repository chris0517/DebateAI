import * as React from 'react';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../Navigation';

//import BackgroundImage from "./backgroundImage.jpg"

const serverURL = '';

const opacityValue = 0.9;

const Classroom = () => {
  return (
    <div style={{padding: '20px'}}>
      <NavBar />
      <Grid container spacing={3} padding={3}>
        <Typography color="#FFFFFF">Classroom Page</Typography>
      </Grid>
    </div>
  );
};

export default Classroom;
