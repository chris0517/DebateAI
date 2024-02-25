import React, { useState, useEffect } from 'react';
import {Grid, Paper, Typography} from '@mui/material';
import NavBar from '../Navigation';
import {useNavigate} from 'react-router-dom';

const serverURL = '';

// const topics = [
//   {title: 'Gun Control', image: Gun},
//   {title: 'Climate Change', image: Climate},
//   {title: 'Legalization of Marijuana', image: Mari},
// ];


const DebateTopics = () => {

  const [topics, setTopics] = useState([]);

  React.useEffect(() => {
    loadTitles();
  }, []);

  const loadTitles = () => {
    callApiLoadTitles().then(res => {
      console.log('callApiLoadTitles returned: ', res);
      var parsed = JSON.parse(res.express);
      console.log('callApiLoadTitles parsed: ', parsed);
      setTopics(parsed);
    });
  };
  
  const callApiLoadTitles = async () => {
    const url = serverURL + '/api/getTopics';
    console.log(url);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('User settings: ', body);
    return body;
  };
  
  const navigate = useNavigate();
  return (
    <div className="h-full bg-green border-yellow border-1">
      <NavBar />

      <Grid container spacing={3} padding={3}>
        {topics.map((topic, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            onClick={() => navigate(`/chat`)}
          >
            <Paper style={{padding: '20px', textAlign: 'center'}}>
              <Typography variant="h5">{topic.title}</Typography>
              <img
                src={topic.banner_link}
                style={{Width: '100px', height: '200px'}}
              />
              <p>{topic.description}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DebateTopics;
