// @ts-nocheck
import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';

export default function OneSearchUser({ user }): JSX.Element {
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={'/user/' + user.id}>
        <ListItemAvatar>
          <Avatar alt="photo" src={user.avatar} />
        </ListItemAvatar>
        <ListItemText primary={user.firstname + ' ' + user.lastname} />
      </ListItemButton>
    </ListItem>
  );
}
