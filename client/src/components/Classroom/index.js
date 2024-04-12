import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField, Container, Grid, Box, Paper } from '@mui/material'; 
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
  const [classInfo, setClassInfo] = useState(null);
  const [assignment, setAssignment] = useState("");

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

  useEffect(() => {
    loadClassroom();
  }, []);
  
  const loadClassroom = () => {
    callApiClassroomInfo()
      .then(res => {
        console.log("loadClassroom returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadClassroom parsed: ", parsed);
        if(parsed.length != 0){
          const name = parsed[0].Title;
          setClassroomName(name);
          const assignment = parsed[0].Description;
          setAssignment(assignment);
        }
      })
  }

  const callApiClassroomInfo = async () => {
      const url = serverURL + '/api/classroomInfo';
      console.log('Sending user data to:', url);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({classCode: user.classroomID})
        });

        const body = await response.json();
        console.log("body", body);

        if (response.status !== 200) {
          throw Error(body.error); // Throw the error received from the API
        }
      return body;
    };

  const renderContentBasedOnRoles = () => {
    if (user.roles === 'Teacher') {
      return (
        <>
        <TeacherContent
          name={classroomName}
          classCode={classCode}
          assignment={assignment}
          setClassCode={setClassCode}
          handleCreateClassroom={handleCreateClassroom}
          setClassroomName={setClassroomName}
          handleNameChange={handleNameChange}
          loadClassroom={loadClassroom}
        />
        </>
      );
    } else if (user.roles === 'Student') {
      return (
        <StudentContent
        
          name={classroomName}
          assignment={assignment}
          studentID={studentID}
          setStudentID={setStudentID}
          classroomID={classroomID}
          setClassroomID={setClassroomID}
        />
      );
    } else {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin:'25px' }}>
          <Typography>Please Log in first</Typography>
          <Button id="navigate" onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      );
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <NavBar />
      <Container maxWidth="lg">
        <Box component={Paper} elevation={1} p={2} marginTop={3}>
          {renderContentBasedOnRoles()}
        </Box>
      </Container>
    </div>
  );
};

export default Classroom;
