import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:9000'); // Change the URL based on your backend server

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    newSocket.on('msg-recieve', (data) => {
      console.log('Message received:', data);
      setMessages((prevMessages) => [...prevMessages, { text: data, fromSelf: false }]);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    if (socket) {
      socket.emit('send-msg', { to: 'recipientUserId', msg: message }); // Replace 'recipientUserId' with actual recipient user ID
      setMessages((prevMessages) => [...prevMessages, { text: message, fromSelf: true }]);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ padding: '5px', backgroundColor: msg.fromSelf ? '#e6f7ff' : '#f2f2f2' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
