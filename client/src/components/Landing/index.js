import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';
import Gun from './icons/Gun.png';
import Climate from './icons/Climate.png';
import Mari from './icons/Mari.png';
import NavBar from '../Navigation';

const topics = [
  {title: 'Gun Control', image: Gun},
  {title: 'Climate Change', image: Climate},
  {title: 'Legalization of Marijuana', image: Mari},
];

const DebateTopics = () => {
  return (
    <div className="h-full bg-green border-yellow border-1">
      <NavBar />
      <Grid container spacing={3} padding={3}>
        {topics.map((topic, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper style={{padding: '20px', textAlign: 'center'}}>
              <Typography variant="h5">{topic.title}</Typography>
              <img
                src={topic.image}
                style={{Width: '100px', height: '200px'}}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DebateTopics;
