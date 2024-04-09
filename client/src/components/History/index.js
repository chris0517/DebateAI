import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {selectUserData} from '../../redux/reducers/userSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import NavBar from '../Navigation';

const History = () => {
  const user = useSelector(selectUserData);
  const [debates, setDebates] = useState([]);
  const [studentNumber, setStudentNum] = useState('');
  const serverURL = ''; // Your server URL here
  const navigate = useNavigate();
  const location = useLocation();

  const formattedDateTime = date => {
    console.log(date);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Use `false` for 24-hour format
    }).format(date);
  };

  const getPrevDebates = async () => {
    let userId = user.id;
    console.log(location.state);
    if (location.state?.student) {
      userId = location.state.student;
      setStudentNum(location.state.studentNum);
    }
    const queryParams = new URLSearchParams({userID: userId}).toString();
    const url = `${serverURL}/api/getDebates?${queryParams}`;
    let token = localStorage.getItem('userToken');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        const body = await response.json();
        console.log(body.express);
        setDebates(JSON.parse(body.express)); // Assuming the API returns JSON
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to fetch debates:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    if (user) {
      getPrevDebates();
    }
  }, [user]);

  return (
    <div>
      <NavBar />

      <Typography
        variant="h4"
        gutterBottom
        style={{
          margin: '20px',
          textAlign: 'center',
        }}
      >
        {studentNumber
          ? `Previous Debates for Student: ` + studentNumber
          : `Previous Debates`}
      </Typography>

      <Grid container spacing={3}>
        {debates.map(debate => (
          <Grid item key={debate.id} xs={12} sm={6} md={4}>
            <Card
              onClick={() => navigate(`/debate/${debate.debateID}`)}
              sx={{cursor: 'pointer'}}
            >
              <CardMedia
                component="img"
                height="140"
                image={`https://thumbnailimgs.s3.us-east-2.amazonaws.com/images/${debate.image}`}
                alt="Debate Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {debate.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formattedDateTime(debate.debateID)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default History;
