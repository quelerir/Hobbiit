import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemAvatar,
    Avatar,
  } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUserTreadsThunk } from '../../redux/slices/userTreadsSlice';


export default function TreadList() {
 const userTreads = useAppSelector((store) => store.usertreads);
 const dispatch = useAppDispatch();
 const subscribers = useAppSelector((store) => store.subscribers);

 useEffect(() => {
  dispatch(getUserTreadsThunk());
}, [subscribers]);

  return (
    <Card sx={{ minWidth: 375, maxWidth: 375, height: '85vh' }}>
    <CardContent>
      <Typography sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>
        Subscribes
      </Typography>
      <Grid item xs={12}>
        <List>
          {userTreads.map((tread) => 
              <ListItem disablePadding key={tread.id}>
                <ListItemButton component="a" href={`/tread/${tread.id}`}>
                <ListItemAvatar>
                <Avatar alt="photo" src={tread.treadimg} />
                </ListItemAvatar>
                <ListItemText primary={tread.treadtitle} />
                </ListItemButton>
              </ListItem>
        )}
        </List>
      </Grid>
    </CardContent>
  </Card>
  )
}
