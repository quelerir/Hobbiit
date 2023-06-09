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
  Box,
  Popover,
} from '@mui/material';
import { UserType } from '../../types/UserTypes';
import EditUserForm from './EditUserForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import { getUserName } from '../utils/getUserName';
import BadgeAvatar from '../ui/BadgeAvatar';
import emojis from '../utils/emojis';
import { UPDATE_STATUS } from '../../types/wsTypes';
import { setMessageThunk } from '../../redux/slices/chatSlice';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: UserType;
};

export default function UserPage({ darkMode, toggleDarkMode, user }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState(true);

  const handleClick = (status: string): void => {
    dispatch({ type: UPDATE_STATUS, payload: { status } });
  };

  const userSelector = useAppSelector((store) => store.user);
  const { friendsList = [], friendsOnline = [] } = useAppSelector((store) => store.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriendsThunk(userSelector.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector.id]);

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {isEdit ? (
              <Card sx={{ minWidth: 275, maxWidth: 775 }}>
                <Stack sx={{ mt: 2, ml: 2 }}>
                  <Avatar onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)} alt="Remy Sharp" src={`${user.avatar}`} sx={{ width: 56, height: 56 }} />
                  <Popover
                id="avatarPopover"
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box display="flex" flexDirection="column">
                  {Object.entries(emojis).map((el) => (
                    <Button key={el[0]} onClick={() => handleClick(el[0])}>
                      {el[1]}
                    </Button>
                  ))}
                </Box>
              </Popover>
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
