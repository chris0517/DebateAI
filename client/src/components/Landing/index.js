import React, {useState, useEffect} from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import NavBar from '../Navigation';
import {useNavigate} from 'react-router-dom';
import Phone from './icons/mobile.png';
import Mari from './icons/Mari.png';
import Climate from './icons/Climate.png';

const serverURL = '';

const phone = [Phone];
const climate = [Climate];
const mari = [Mari];

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
    <div
      style={{padding: '20px'}}
      className="min-h-screen border-2 p-3 overflow-hidden"
    >
      <NavBar />

      <div className="p-5">
        <Grid container spacing={3}>
          {topics.map((topic, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              className="flex"
            >
              <Card
                className="flex flex-col justify-between w-full max-w-sm mx-auto bg-white rounded-lg shadow-md"
                onClick={() => navigate(`/chat/${topic.topic_prompt}`)}
              >
                <CardActionArea className="flex flex-col h-full">
                  <CardMedia
                    component="img"
                    className="h-48 w-full object-cover"
                    image={`https://thumbnailimgs.s3.us-east-2.amazonaws.com/images/${topic.banner_img}`}
                    alt={topic.title}
                  />
                  <CardContent className="flex flex-1 flex-col justify-between p-4">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="text-lg font-bold"
                    >
                      {topic.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="text-base"
                    >
                      {topic.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default DebateTopics;
