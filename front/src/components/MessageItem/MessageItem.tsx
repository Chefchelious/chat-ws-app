import React from 'react';
import './MessageItem.css';
import { IMessage } from '../../types';
import { useAppSelector } from '../../app/hook.ts';
import { selectUser } from '../../features/users/usersSlice.ts';

interface IProps {
  message: IMessage;
}

const MessageItem: React.FC<IProps> = ({ message }) => {
  const user = useAppSelector(selectUser);

  return (
    <div className={`message ${user?.username === message.authorUsername ? 'sender' : ''}`}>
      <p>
        <span>
          <strong>{message.authorName}: </strong>
        </span>
        {message.text}
      </p>
    </div>
  );
};

export default MessageItem;
