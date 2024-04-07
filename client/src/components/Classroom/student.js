import React, { useState, useContext, useEffect} from 'react';
import { Grid, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/reducers/userSlice';
const serverURL = '';



const StudentContent = ({ studentID, setStudentID, classroomID, setClassroomID, handleJoinClassroom }) => {
  const user = useSelector(selectUserData);
  const [student, setStudent] = useState({});
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
  
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {user.classroomID && (
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
                </Grid>        
          )}
      </Grid>
    </div>
  );
};


export default StudentContent;
