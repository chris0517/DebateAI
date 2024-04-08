import React, { useState, useContext, useEffect} from 'react';
import {Divider, Grid, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';
import { CheckCircleOutlineOutlined, RadioButtonUncheckedOutlined } from '@mui/icons-material';

const serverURL = '';

const TeacherContent = ({ assignment, name, classCode, setClassCode, handleCreateClassroom, classroomName, setClassroomName, handleNameChange}) => {
    const user = useSelector(selectUserData);
    const [student, setStudent] = useState({});
    const [names, setNames] = useState([]);
    const [studentNums, setstudentNums] = useState([]);   
    const [assignmentText, setAssignmentText] = useState('');
    const [check, setCheck] = useState(false);


    useEffect(() => {
        console.log(user.classroomID)
        loadList();
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
    
    const handleAssignmentChange = (event) => {
        setAssignmentText(event.target.value);
      };
    
    const handleAssignClick = () => {
        // Implement assignment logic here
        console.log('Assignment:', assignmentText);
        const sentInfo = {
            assignment: assignmentText, 
            classCode: user.classroomID
          };
        callApiAddAssignment(sentInfo);
        setAssignmentText("");
    };



    const callApiAddAssignment = async requestBody => {
        const url = serverURL + '/api/addAssignment';
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
    
    

    return (
        
        <Grid >
        {user.classroomID ? (
            <>
            <Grid container spacing={2} justifyContent="center">
                <Grid container spacing={2} item xs={12}>
                    <Grid item xs={6} style={{marginTop:'20px'}}>
                    <Typography variant="h2" >{name}</Typography>
                    <Typography variant="body1">Classroom ID: {user.classroomID}</Typography>
                    <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}/>

                    </Grid>

                </Grid>

                <Grid container spacing={2} item xs={12} style={{margin:'5px'}}>
                    <Grid item xs={6} >
                    <Typography variant="h6">Student List:</Typography>
                    <div>
                        <List>
                        {check && student.map((student, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={(
                                    <>
                                        <div>Name: {student.Name}</div>
                                        <ul style={{ marginLeft: 20, listStyleType: 'disc'  }}>
                                            <li >Student Number: {student.StudentNumber}</li>
                                        </ul>
                                        <ul style={{ marginLeft: 20, listStyleType: 'disc', display: 'flex', alignItems: 'center' }}>

                                            {student.Assignment === 1? (
                                                <>
                                                    <li>Assignment: Completed</li>
                                                    <CheckCircleOutlineOutlined style={{ marginLeft: 10, color: 'green' }} />
                                                </>

                                            ) : (
                                                <>
                                                    <li>Assignment: Incomplete</li>
                                                    <RadioButtonUncheckedOutlined style={{ marginLeft: 10, color: 'red' }} />
                                                </>
                                            )}
                                        </ul>
                                    </>
                                    )}
                                />
                            </ListItem>
                        ))}
                        </List>
                    </div>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        label="Enter assignment"
                        variant="outlined"
                        fullWidth
                        value={assignmentText}
                        onChange={handleAssignmentChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleAssignClick} style={{ marginTop: 20 }}>
                        Assign Assignment
                    </Button>
                    <div>
                        <Typography variant="h6" style={{ marginTop:'10px'}}>Current Assignments:</Typography>
                        <ul style={{ marginLeft: 20, listStyleType: 'disc', paddingLeft: 0 }}>
                            <li style={{ marginLeft: '20px', marginTop:'10px'}}>{assignment}            
                            </li>
                        </ul>
                    </div>
                    </Grid>
                </Grid>
            </Grid>
            </>
            ) : (
                <Grid container spacing={2}   direction="column" justifyContent="center" alignItems="center">
                        <TextField
                            id="outlined-basic"
                            label="Enter Name"
                            variant="outlined"
                            onChange={handleNameChange} 
                            style={{ width: '200px' ,marginTop: '25px'}} 
                        />
                        <Button
                            style={{ margin: '20px', padding: '10px' }}
                            variant="contained"
                            onClick={handleCreateClassroom}
                        >
                            Create Classroom
                        </Button>
                    <Grid item>
                        {classCode && (
                            <Typography variant="body1">Class Code: {classCode}</Typography>
                        )}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default TeacherContent;
