import React, { useEffect, useState } from 'react';
import Navbar from '../ui/Navbar';
import {
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import EditUserForm from './EditUserForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import { getUserName } from '../utils/getUserName';
import BadgeAvatar from '../ui/BadgeAvatar';
import emojis from '../utils/emojis';
import { useParams } from 'react-router-dom';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function UserPage({ darkMode, toggleDarkMode }: Props): JSX.Element {
  const [isEdit, setIsEdit] = useState(true);

  const user = useAppSelector((store) => store.user);
  const { id } = useParams();
  const { friendsList = [], friendsOnline = [] } = useAppSelector((store) => store.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriendsThunk(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {isEdit ? (
              <Card sx={{ minWidth: 275, maxWidth: 775 }}>
                <Stack sx={{ mt: 2, ml: 2 }}>
                  <Avatar alt="Remy Sharp" src={`${user.avatar}`} sx={{ width: 56, height: 56 }} />
                </Stack>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}
                    color="text.primary"
                    gutterBottom
                  >
                    {`${user.firstname} ${user.lastname}`}
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {user.location}
                  </Typography>
                  <Typography variant="body2">{user.about}</Typography>
                  <CardActions>
                    <Button size="small" onClick={() => setIsEdit(false)}>
                      Edit profile
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            ) : (
              <EditUserForm setIsEdit={setIsEdit} user={user} />
            )}
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
