import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {selectUserData} from '../redux/reducers/userSlice';
import NavBar from '../components/Navigation';

const DebateHistory = () => {
  const [messages, setMessages] = useState([]);
  const serverURL = ''; // Your server URL here
  let {debateID} = useParams();
  let location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUserData);

  useEffect(() => {
    // Assuming you have a function or API call to fetch chat history
    // if (!user) navigate('/login');
    fetchChatHistory();
  }, [debateID, user]);

  const fetchChatHistory = async () => {
    // Example API call to fetch chat history
    const queryParams = new URLSearchParams({
      debateID: debateID,
    }).toString();
    const url = `${serverURL}/api/getChatMessages?${queryParams}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('userToken'),
        },
      });
      if (response.ok) {
        const body = await response.json();
        console.log(body);
        console.log(body.express);
        setMessages(JSON.parse(body.express)); // Assuming the API returns JSON
      } else {
        // navigate('/login');
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      //   navigate('/login');
    }
  };
  console.log(messages);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Back arrow/button */}
      <button
        onClick={() => navigate('/history')}
        className="mb-4 p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <div className="flex flex-col flex-auto overflow-auto bg-white shadow rounded-lg p-4 mb-4">
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`break-words p-2 my-2 rounded-md shadow max-w-xs ${
              message.Sender === 'user'
                ? 'bg-blue-100 ml-auto'
                : 'bg-green-100 mr-auto'
            }`}
          >
            {message.Message} {/* Assuming message object has 'content' */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebateHistory;
