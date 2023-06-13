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
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import { getUserName } from '../utils/getUserName';
import BadgeAvatar from '../ui/BadgeAvatar';
import emojis from '../utils/emojis';
import ModalChat from './ModalChat';
import Dialog from '@mui/material/Dialog';
import ChatIcon from '@mui/icons-material/Chat';

function FriendsList() {
  const [openDialogId, setOpenDialogId] = useState(null);

  const handleOpenDialog = (friendId) => {
    setOpenDialogId(friendId);
  };

  const handleCloseDialog = () => {
    setOpenDialogId(null);
  };

 

  const userSelector = useAppSelector((store) => store.user);
  const { friendsList = [], friendsOnline = [] } = useAppSelector((store) => store.friends);
  const dispatch = useAppDispatch();
  const [listUpdated, setListUpdated] = useState<boolean>(false)
  useEffect(() => {
    if(listUpdated) {
      dispatch(getFriendsThunk(userSelector?.id));

    }
    setListUpdated(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdated]);

  return (
    <Card sx={{ minWidth: 375, maxWidth: 375, height: '85vh' }}>
      <CardContent>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>
          Friends
        </Typography>
        <Grid item xs={12}>
          <List>
            {friendsList?.map((friend) => {
              const emojiKey = friend?.status || 'happy';
              const friendName = getUserName(friend.email);
              const isOnline = friendsOnline.map((el) => el.id).includes(friend.id);
              const isDialogOpen = openDialogId === friend?.id;
              return (
                <ListItem key={friend?.id}>
                  <Link to={`/user/${friend.id}`}>
                    <ListItemAvatar>
                      <BadgeAvatar
                        alt={`${friendName}`}
                        src={`${friend.avatar}`}
                        isOnline={isOnline}
                      />
                    </ListItemAvatar>
                  </Link>
                  <ListItemText
                    primary={`${friend?.firstname + ' ' + friend?.lastname || ''} ${
                      emojis[emojiKey]
                    }`}
                  />
                  <Button
                    endIcon={<ChatIcon />}
                    onClick={() => handleOpenDialog(friend.id)}
                    style={{ height: '44px' }}
                  ></Button>
                  <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                    <ModalChat key={friend.id} friend={friend} />
                  </Dialog>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default React.memo(FriendsList);
