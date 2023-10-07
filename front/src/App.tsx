import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Chat from './containers/Chat/Chat.tsx';

const App = () => {
  return (
    <>
      <CssBaseline />

      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
