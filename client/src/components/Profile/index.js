import React from 'react';
import { Button, TextField, Container, Grid, Box, Paper, Typography} from '@mui/material';

import NavBar from '../Navigation';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';



const Profile = () => {
  const user = useSelector(selectUserData);

  return (
    <div style={{ padding: '20px' }}>
      <NavBar />
      <Box 
        display="flex"
        alignItems="center"
        gap={4}
        padding={12}
        p={2}
      >

      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Paper elevation={3} >
            <Typography variant="h5" padding={1.5}>Profile Information</Typography>
            <Typography variant="body1" gutterBottom paddingLeft={2}>
              Name: {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom paddingLeft={2}>
              Email: {user.email}
            </Typography>

            {user.roles === 'Student' && (
              <Typography variant="body1" gutterBottom paddingLeft={2}>
                Student Number: {user.number}
              </Typography>
            )}
            <Typography variant="body1" gutterBottom paddingLeft={2}> 
              Roles: {user.roles}
            </Typography>
            <Typography variant="body1" gutterBottom paddingLeft={2} paddingBottom={2}> 
              ClassroomID: {user.classroomID}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </div>
  );
};

export default Profile;
