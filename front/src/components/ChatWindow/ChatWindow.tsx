import React, { useEffect, useRef } from 'react';
import MessageItem from '../MessageItem/MessageItem.tsx';
import './ChatWindow.css';
import { IMessage } from '../../types';

interface IProps {
  messages: IMessage[];
}

const ChatWindow: React.FC<IProps> = ({ messages }) => {
  const messageWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageWrap.current) {
      messageWrap.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="chat-window">
      <div className="messages" ref={messageWrap}>
        {messages.map((m, idx) => (
          <MessageItem key={idx} message={m} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
