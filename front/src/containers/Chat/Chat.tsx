import React from 'react';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar.tsx';
import ChatWindow from '../../components/ChatWindow/ChatWindow.tsx';
import MessageForm from '../../components/MessageForm/MessageForm.tsx';
import './Chat.tsx.css';

const Chat = () => {
  return (
    <div className="chat">
      <ChatSidebar />

      <div className="chat-body">
        <ChatWindow />
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
