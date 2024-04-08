import React, {useEffect, useState} from 'react';
import {system_prompt} from '../../constants';
import {useLocation, useParams} from 'react-router-dom';
import NavBar from '../Navigation';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../redux/reducers/userSlice';
import {useNavigate} from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [openAIMessages, setOpenAIMessages] = useState([
    {role: 'system', content: system_prompt},
  ]);
  const serverURL = '';
  const [inputValue, setInputValue] = useState('');
  const [debateID, setDebateID] = useState(null);
  let {topic} = useParams();
  let location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUserData);
  useEffect(() => {
    //need to make a call to the db to get the topic from topic id
    //call API get DB topic
    const userMessage = {
      role: 'user',
      content: `Topic: ${topic}`,
    };
    handleSendMessageToAI([...openAIMessages, userMessage]);
    setOpenAIMessages(messages => [...messages, userMessage]);
  }, []);

  useEffect(() => {
    let topic_id = location.state.topic.topic_id;
    console.log('YEEE');
    console.log(topic_id);
    console.log(user);
    if (topic_id && user) {
      console.log('UHHH');
      insertDebate(topic_id);
    }
  }, [location]);

  useEffect(() => {
    console.log(messages[messages.length - 1]);
    if (debateID) {
      insertChatMessage(messages[messages.length - 1]);
    }
  }, [messages]);

  const insertChatMessage = async message => {
    //create chat message api
    const url = serverURL + '/api/insertChatMessage';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('userToken'),
      },
      body: JSON.stringify({
        debateID: debateID,
        userID: user.id,
        message: message.text,
        sender: message.sender,
        timestamp: Date.now(),
      }),
    });
  };
  const insertDebate = async topic_id => {
    //create detbate api
    const id = Date.now();
    const url = serverURL + '/api/insertDebate';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('userToken'),
      },
      body: JSON.stringify({
        debateID: id,
        topicID: topic_id,
        userID: user.id,
      }),
    });
    setDebateID(id);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      // Add user message
      setMessages(messages => [
        ...messages,
        {text: inputValue, sender: 'user'},
      ]);
      setInputValue('');
      handleSendMessageToAI([
        ...openAIMessages,
        {role: 'user', content: inputValue},
      ]);
      setOpenAIMessages(messages => [
        ...messages,
        {role: 'user', content: inputValue},
      ]);
    }
  };

  const handleSendMessageToAI = async messages => {
    let userToken = localStorage.getItem('userToken');
    const url = serverURL + '/api/chatCompletion';
    // Send messages to API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      body: JSON.stringify({messages}),
    });

    if (response.statusText === 'Unauthorized') {
      window.location.href = '/login';
    }
    const data = await response.json();
    console.log(data);
    setOpenAIMessages(messages => [
      ...messages,
      {role: 'assistant', content: data.express},
    ]);

    setMessages(messages => [...messages, {text: data.express, sender: 'ai'}]);
    messages.push({role: 'ai', content: data.express});
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Back arrow/button */}
      <button
        onClick={() => navigate('/')}
        className="mb-4 p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <div className="flex flex-col flex-auto overflow-auto bg-white shadow rounded-lg p-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`break-words p-2 my-2 rounded-md shadow max-w-xs ${
              message.sender === 'user'
                ? 'bg-blue-100 ml-auto'
                : 'bg-green-100 mr-auto'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex-none">
        <div className="flex space-x-2">
          <input
            id="chat-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            id="chat-send"
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
