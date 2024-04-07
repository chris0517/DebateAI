import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField, Container, Grid, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
import TeacherContent from './teacher';
import StudentContent from './student';
import NavBar from '../Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateClassroomID,selectUserData } from '../../redux/reducers/userSlice';


const serverURL = '';

const Classroom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);
  const email = user.email;
  const [classCode, setClassCode] = useState('');
  const [studentID, setStudentID] = useState('');
  const [classroomID, setClassroomID] = useState('');
  const [classroomName, setClassroomName] = useState("");

  const handleNameChange = (e) => {
      setClassroomName(e.target.value);    
  };
  useEffect(() => {
    const min = 100000;
    const max = 999999;
    const newClassCode = Math.floor(Math.random() * (max - min + 1)) + min;
    setClassCode(newClassCode);
  }, []);

  const handleCreateClassroom = () => {
    callApiAddClassroom({classCode, email, classroomName})
    dispatch(updateClassroomID({ classroomID: classCode}));
  };

  const callApiAddClassroom = async requestBody => {
    const url = serverURL + '/api/generateClassroom';
    console.log('Sending classroom id to:', url);
    console.log(requestBody)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });
  
    const body = await response.json();
    console.log("body", body);
  
    if (response.status !== 200) {
      throw Error(body.error); // Throw the error received from the API
    }
    return body;
  };

  const handleJoinClassroom = () => {
  };

  const renderContentBasedOnRoles = () => {
    if (user.roles === 'Teacher') {
      return (
        <TeacherContent
          classCode={classCode}
          setClassCode={setClassCode}
          handleCreateClassroom={handleCreateClassroom}
          classroomName={classroomName}
          setClassroomName={setClassroomName}
          handleNameChange={handleNameChange}
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
