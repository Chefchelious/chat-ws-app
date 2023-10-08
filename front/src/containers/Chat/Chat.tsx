import React, { useEffect, useRef, useState } from 'react';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar.tsx';
import ChatWindow from '../../components/ChatWindow/ChatWindow.tsx';
import MessageForm from '../../components/MessageForm/MessageForm.tsx';
import { useAppSelector } from '../../app/hook.ts';
import { selectUser } from '../../features/users/usersSlice.ts';
import './Chat.tsx.css';
import { IConnectedUser, IIncomingMessage } from '../../types';

const Chat = () => {
  const user = useAppSelector(selectUser);
  const ws = useRef<WebSocket | null>(null);
  const [users, setUsers] = useState<IConnectedUser[]>([]);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/chat?token=${user?.token}`);

    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IIncomingMessage;

      if (decodedMessage.type === 'USER_LIST') {
        decodedMessage.payload.userList && setUsers(decodedMessage.payload.userList);
      }

      if (decodedMessage.type === 'NEW_USER') {
        decodedMessage.payload.newUser &&
          setUsers((prevState) => [...prevState, decodedMessage.payload.newUser]);
      }
    };

    ws.current.onclose = () => console.log('ws close');

    return () => {
      ws.current?.close();
    };
  }, [user]);

  return (
    <div className="chat">
      <ChatSidebar users={users} />

      <div className="chat-body">
        <ChatWindow />
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
