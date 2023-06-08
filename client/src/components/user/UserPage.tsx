import React, { useEffect } from 'react';
import Navbar from '../ui/Navbar';
import { Container } from '@mui/material';
import { Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserName } from '../utils/getUserName';
import BadgeAvatar from '../ui/BadgeAvatar';
import emojis from '../utils/emojis';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function UserPage({ darkMode, toggleDarkMode }: Props): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const { friendsList = [], friendsOnline = [] } = useAppSelector((store) => store.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriendsThunk(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="lg">
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
                  <ListItemText primary={`${friend?.firstname || ''}`} />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Container>
    </div>
  );
}
