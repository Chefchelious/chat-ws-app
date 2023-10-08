import React from 'react';
import './ChatSidebar.css';
import { IConnectedUser } from '../../types';

interface IProps {
  users: IConnectedUser[];
}

const ChatSidebar: React.FC<IProps> = ({ users }) => {
  return (
    <div className="sidebar">
      <h4>users online</h4>
      <hr />
      <ul className="user-list">
        {users.map((u, idx) => (
          <li key={idx} className="user-list__item">
            {u.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
