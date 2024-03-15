import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField, Container, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';

import NavBar from '../Navigation';

const Classroom = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUserData);
  const [classCode, setClassCode] = useState('');
  const [studentID, setStudentID] = useState('');
  const [classroomID, setClassroomID] = useState('');

  const handleCreateClassroom = () => {
    const newClassCode = uuidv4().substr(0, 8);
    setClassCode(newClassCode);
  };

  const handleJoinClassroom = () => {
    // Additional logic to handle joining classroom
  };

  const renderContentBasedOnRoles = () => {
    if (user.roles === 'Teacher') {
      return (
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button padding={2} variant="contained" onClick={handleCreateClassroom}>Create Classroom</Button>
          </Grid>
          <Grid item>
            {classCode && (
              <Typography variant="body1">Class Code: {classCode}</Typography>
            )}
          </Grid>
        </Grid>
      );
    } else if (user.roles === 'Student') {
      return (
        <Grid   
          container
          direction="column"
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12} paddingBottom={2}>
            <TextField
              label="Student ID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <TextField
              label="Classroom ID"
              value={classroomID}
              onChange={(e) => setClassroomID(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <Button variant="contained" onClick={handleJoinClassroom} fullWidth>Join Classroom</Button>
          </Grid>
        </Grid>
      );
    } else {
      // Default case or additional conditions
      return(
        <div>
          <Typography>Please Log in first</Typography>
          <Button id="navigate" onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      )
    }
  };
  
  // Render the content based on user's roles
  return (
    <div style={{ padding: '20px' }}>
      <NavBar />
      <Container maxWidth="xs">
        <Box mb={2} sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {renderContentBasedOnRoles()}
        </Box>
      </Container>
    </div>
  );
};

export default Classroom;
