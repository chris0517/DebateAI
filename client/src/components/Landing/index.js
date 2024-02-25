import React, {useState, useEffect} from 'react';
import {Grid, Paper, Typography} from '@mui/material';
import NavBar from '../Navigation';
import {useNavigate} from 'react-router-dom';
import Phone from './icons/mobile.png';
import Mari from './icons/Mari.png';
import Climate from './icons/Climate.png';



const serverURL = '';

const phone = [ Phone ];
const climate = [ Climate ];
const mari = [ Mari ];


// {title: 'Climate Change', image: Climate},
// {title: 'Legalization of Marijuana', image: Mari},
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
  console.log('topics: ', topics);
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
            onClick={() => navigate(`/chat/${topic.topic_prompt}`)}
          >
            <Paper style={{padding: '20px', textAlign: 'center', height: '100%'}}>
              <Typography variant="h5">{topic.title}</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              {topic.title === 'Climate Change' &&(
                <img
                  src={Climate}
                  style={{Width: '100px', height: '190px', margin: '20px'}}
                />
                )
              }
              {topic.title === 'Legalization of Marijuana' &&(
                <img
                  src={Mari}
                  style={{Width: '100px', height: '180px', margin: '20px'}}
                />
                )
              }              
              {topic.title === 'Iphones vs android' &&(
                <img
                  src={Phone}
                  style={{Width: '100px', height: '180px', margin: '20px'}}
                />
                )
              }
              </div>
              <p>{topic.description}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DebateTopics;
