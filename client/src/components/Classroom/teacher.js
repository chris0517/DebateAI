import React, { useState, useContext, useEffect} from 'react';
import { Grid, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';
const serverURL = '';

const TeacherContent = ({ classCode, setClassCode, handleCreateClassroom, classroomName, setClassroomName, handleNameChange}) => {
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
      };

    return (
        
        <Grid container spacing={2} justifyContent="center">
            {user.classroomID ? (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">Classroom ID: {user.classroomID}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Students:</Typography>
                        <div>
                        <List>
                            {check && student.map((student, index) => (
                                <ListItem key={index}>
                                <ListItemText primary={`${student.Name}, Number: ${student.StudentNumber}`} />
                                </ListItem>
                            ))}
                        </List>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        label="Enter assignment"
                        variant="outlined"
                        fullWidth
                        value={assignmentText}
                        onChange={handleAssignmentChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleAssignClick}>
                        Assign
                        </Button>
                    </Grid>
                </Grid>
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
