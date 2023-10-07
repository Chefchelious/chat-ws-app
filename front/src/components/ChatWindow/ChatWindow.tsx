import React, { useEffect, useRef } from 'react';
import MessageItem from '../MessageItem/MessageItem.tsx';
import './ChatWindow.css';

const ChatWindow = () => {
  const messageWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageWrap.current) {
      messageWrap.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="chat-window">
      <div className="messages" ref={messageWrap}>
        <MessageItem text="message 1 dsadasdasd faklmfsd lfm m dsfmf kldsmfkldsm fmdskl mfmsdlk" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
        <MessageItem text="message 2" />
      </div>
    </div>
  );
};

export default ChatWindow;
