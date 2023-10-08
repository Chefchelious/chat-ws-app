import React, { useEffect, useRef, useState } from 'react';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar.tsx';
import ChatWindow from '../../components/ChatWindow/ChatWindow.tsx';
import MessageForm from '../../components/MessageForm/MessageForm.tsx';
import { useAppSelector } from '../../app/hook.ts';
import { selectUser } from '../../features/users/usersSlice.ts';
import { IConnectedUser, IIncomingMessage, IMessage, IUser } from '../../types';
import './Chat.tsx.css';

const Chat = () => {
  const user = useAppSelector(selectUser);
  const ws = useRef<WebSocket | null>(null);
  const [users, setUsers] = useState<IConnectedUser[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/chat?token=${user?.token}`);

    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IIncomingMessage;

      if (decodedMessage.type === 'USER_LIST') {
        setUsers(decodedMessage.payload as IUser[]);
      }

      if (decodedMessage.type === 'NEW_USER') {
        decodedMessage.payload &&
          setUsers((prevState) => [...prevState, decodedMessage.payload as IUser]);
      }

      if (decodedMessage.type === 'NEW_MESSAGE') {
        setMessages((prevState) => [...prevState, decodedMessage.payload as IMessage]);
      }
    };

    ws.current.onclose = () => console.log('ws close');

    return () => {
      ws.current?.close();
    };
  }, [user]);

  const sendMessage = (message: string) => {
    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: {
          text: message,
          authorUsername: user?.username,
          authorName: user?.displayName,
        },
      }),
    );
  };

  return (
    <div className="chat">
      <ChatSidebar users={users} />

      <div className="chat-body">
        <ChatWindow messages={messages} />
        <MessageForm onSubmit={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
