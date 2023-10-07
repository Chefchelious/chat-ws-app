import React from 'react';
import './MessageItem.css';

interface IProps {
  text: string;
}

const MessageItem: React.FC<IProps> = ({ text }) => {
  return (
    <div className="message">
      <p>{text}</p>
    </div>
  );
};

export default MessageItem;
