import * as React from 'react';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../Navigation';
import { login, selectUserData } from '../../redux/reducers/userSlice';
import store from '../../redux/store'; // Import the Redux store
import { useSelector } from 'react-redux';
//import BackgroundImage from "./backgroundImage.jpg"

const serverURL = '';

const opacityValue = 0.9;

const Classroom = () => {
  const user = useSelector(selectUserData);

  return (
    <div style={{padding: '20px'}}>
      <NavBar />
      <Grid container spacing={3} padding={3}>
        <Typography color="#000">Classroom Page</Typography>
      </Grid>
      <div>
            {/* Render user data */}
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Student Number: {user.studentNumber}</p>
            <p>Roles: {user.roles}</p>
          </div>
    </div>
  );
};

export default Classroom;
