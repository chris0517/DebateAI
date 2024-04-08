import React, { useState, useContext, useEffect} from 'react';
import { Switch, Divider, Grid, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { CheckCircleOutlineOutlined, RadioButtonUncheckedOutlined } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';
const serverURL = '';



const StudentContent = ({ name, assignment, studentID, setStudentID, classroomID, setClassroomID }) => {
  const user = useSelector(selectUserData);
  const [student, setStudent] = useState({});
  const [check, setCheck] = useState(false);
  const [complete, setcomplete] = useState(false);

  const handleSwitchChange = () => {
    setcomplete(!complete);
    const sentInfo = {
      assignmentStatus: !complete, 
      email: user.email
    };
    callApiUpdateAssignment(sentInfo);
  };

  const callApiUpdateAssignment = async requestBody => {
    const url = serverURL + '/api/updateAssignment';
    console.log('Sending user data to:', url);
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
    console.log(user.classroomID)
    loadList();
    console.log(student)
    for(let x = 0; x < student.length; x++){
      const current = student[x];
      if(current.Email === user.email){
        if(current.Assignment === 0){
          console.log(current.Assignment)
          setcomplete(false);
        }else{
          setcomplete(true);
        }
      }
    }
  }, []);

  const loadList = () => {
    callstudentList()
      .then(res => {
        console.log("callretrieveUser returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callretrieveUser parsed: ", parsed);
        setStudent(parsed);
        console.log(student)
        setCheck(true);
      })
  }

  const callstudentList = async () => {
      const url = serverURL + "/api/studentList";
      console.log(url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({classCode: user.classroomID})

      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("StudentList: ", body);        
      return body;
  };
  
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        
        <Grid container spacing={2} justifyContent="center">
            <Grid container spacing={2} item xs={12}>
                <Grid item xs={6} style={{marginTop:'20px'}}>
                  <Typography variant="h2" >{name}</Typography>
                  <Typography variant="body1">Classroom ID: {user.classroomID}</Typography>
                  <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}/>
                </Grid>

              </Grid>

      <Grid container spacing={2} item xs={12} style={{ margin: '5px' }}>
      <Grid item xs={6}>
        <Typography variant="h4" style={{  }}>
          Student List:
        </Typography>
        <div>
          <List style={{ paddingLeft: 0 }}>
            {check &&
              student.map((student, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <>
                        <div>Name: {student.Name}</div>
                        <ul style={{ marginLeft: 20, listStyleType: 'disc', paddingLeft: 0 }}>
                          <li>Student Number: {student.StudentNumber}</li>
                        </ul>
                      </>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </div>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h4" style={{ marginBottom: '14px' }}>
          Assignments:
        </Typography>
        <div>
          <ul style={{ marginLeft: 20, listStyleType: 'disc', paddingLeft: 0 }}>
            <li style={{ marginLeft: '20px', fontSize:'20px'}}>{assignment}            
            </li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <Switch checked={complete} onChange={handleSwitchChange} color="primary" />
            {complete ? (
              <CheckCircleOutlineOutlined style={{ marginLeft: 10, color: 'green' }} />
            ) : (
              <RadioButtonUncheckedOutlined style={{ marginLeft: 10, color: 'red' }} />
            )}
          </div>
        </div>
      </Grid>
    </Grid>
                </Grid>     

      </Grid>
    </div>
  );
};


export default StudentContent;
