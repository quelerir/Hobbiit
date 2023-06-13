import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';

export default function OneSearchTread({ tread }): JSX.Element {
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`/tread/${tread.id}`}>
        <ListItemAvatar>
          <Avatar alt="photo" src={tread.treadimg} />
        </ListItemAvatar>
        <ListItemText primary={tread.treadtitle} />
      </ListItemButton>
    </ListItem>
  );
}
