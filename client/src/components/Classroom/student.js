import React from 'react';
import { Grid, Button, TextField } from '@mui/material';

const StudentContent = ({ studentID, setStudentID, classroomID, setClassroomID, handleJoinClassroom }) => {
  return (
    <Grid   
      container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12} paddingBottom={2}>
        <TextField
          label="Student Number"
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
};

export default StudentContent;
