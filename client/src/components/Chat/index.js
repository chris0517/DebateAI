import React, {useEffect, useState} from 'react';
import {system_prompt} from '../../constants';
import {useParams} from 'react-router-dom';
import NavBar from '../Navigation';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [openAIMessages, setOpenAIMessages] = useState([
    {role: 'system', content: system_prompt},
  ]);
  const serverURL = '';
  const [inputValue, setInputValue] = useState('');
  let {topic} = useParams();

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

  const callAPITopics = async () => {
    return {
      role: 'user',
      content:
        'Topic: We are debating whether iphones are better then androids',
    };
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
    console.log(userToken);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      body: JSON.stringify({messages}),
    });
    console.log(response);
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

  const callApiLoadMovies = async () => {
    const url = serverURL + '/api/getMovies';
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

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
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
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
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
