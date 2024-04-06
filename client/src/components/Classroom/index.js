import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField, Container, Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
import TeacherContent from './teacher';
import StudentContent from './student';
import NavBar from '../Navigation';

const Classroom = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUserData);
  const [classCode, setClassCode] = useState('');
  const [studentID, setStudentID] = useState('');
  const [classroomID, setClassroomID] = useState('');

  const handleCreateClassroom = () => {
    const min = 100000;
    const max = 999999;
    const newClassCode = Math.floor(Math.random() * (max - min + 1)) + min;
    setClassCode(newClassCode);
  };

  const handleJoinClassroom = () => {
    // Additional logic to handle joining classroom
  };

  const renderContentBasedOnRoles = () => {
    if (user.roles === 'Teacher') {
      return (
        <TeacherContent
          classCode={classCode}
          setClassCode={setClassCode}
          handleCreateClassroom={handleCreateClassroom}
        />
      );
    } else if (user.roles === 'Student') {
      return (
        <StudentContent
          studentID={studentID}
          setStudentID={setStudentID}
          classroomID={classroomID}
          setClassroomID={setClassroomID}
          handleJoinClassroom={handleJoinClassroom}
        />
      );
    } else {
      // Default case or additional conditions
      return (
        <div>
          <Typography>Please Log in first</Typography>
          <Button id="navigate" onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      );
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
