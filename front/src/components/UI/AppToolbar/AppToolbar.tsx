import React from 'react';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hook.ts';
import { selectUser } from '../../../features/users/usersSlice.ts';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const location = useLocation();
  const { pathname } = location;

  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: pathname.includes('chat') ? 0 : 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/chat">Chat</Link>
        </Typography>

        {user ? <UserMenu user={user} /> : <AnonymousMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
