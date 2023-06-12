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
      <Grid item xs={3}>
        <List>
          {userTreads.map((tread) => {
            return (
              <ListItem key={tread.id}>
                <Link to={`/tread/${tread.id}`}>
            <ListItemText
                  primary={`${tread.treadtitle}`}
                />
                </Link>
              </ListItem>
            );
        })}
        </List>
      </Grid>
    </CardContent>
  </Card>
  )
}
