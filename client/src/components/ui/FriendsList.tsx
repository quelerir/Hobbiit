import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import { getUserName } from '../utils/getUserName';
import BadgeAvatar from '../ui/BadgeAvatar';
import emojis from '../utils/emojis';


function FriendsList() {

  const userSelector = useAppSelector((store) => store.user);
  const { friendsList = [], friendsOnline = [] } = useAppSelector((store) => store.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriendsThunk(userSelector.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector.id]);

  return (
    <Card sx={{ minWidth: 375, maxWidth: 375, height: '85vh' }}>
    <CardContent>
      <Typography sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>
        Friends
      </Typography>
      <Grid item xs={3}>
        <List>
          {friendsList.map((friend) => {
            const emojiKey = friend?.status || 'happy';
            const friendName = getUserName(friend.email);
            const isOnline = friendsOnline.map((el) => el.id).includes(friend.id);
            return (
              <ListItem key={friend.id}>
                <ListItemAvatar>
                  <BadgeAvatar
                    alt={`${friendName}`}
                    src={`/images/${friendName}.jpeg`}
                    isOnline={isOnline}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${friend?.firstname + ' ' + friend?.lastname || ''} ${
                    emojis[emojiKey]
                  }`}
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </CardContent>
  </Card>
  )
}

export default React.memo(FriendsList)