import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';

const TeacherContent = ({ classCode, setClassCode, handleCreateClassroom }) => {
    const user = useSelector(selectUserData);

    return (
        
        <Grid container spacing={2} justifyContent="center">
            {user.classroomID ? (
                <Grid item>
                <Typography variant="body1">Classroom ID: {user.classroomID}</Typography>
                </Grid>
            ) : (
                <>
                <Grid item>
                    <Button padding={2} variant="contained" onClick={handleCreateClassroom}>Create Classroom</Button>
                </Grid>
                <Grid item>
                    {classCode && (
                    <Typography variant="body1">Class Code: {classCode}</Typography>
                    )}
                </Grid>
                </>
            )}
        </Grid>
    );
};

export default TeacherContent;
