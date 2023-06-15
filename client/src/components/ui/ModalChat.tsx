// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { Button, Input } from '@mui/material';
import { setMessageThunk } from '../../redux/slices/chatSlice';
import { SEND_MESSAGE } from '../../types/wsTypes';

export default function ModalChat({ friend }) {
  const dispatch = useAppDispatch();
  const endRef = useRef<HTMLLIElement>(null);

  const UserMassage = useAppSelector((store) => store.UserMessage);

  useEffect(() => {
    dispatch(setMessageThunk(friend.id));
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [UserMassage.length]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch({
      type: SEND_MESSAGE,
      payload: { recipientId: friend.id, message: e.currentTarget.message.value },
    });
    e.currentTarget.message.value = '';
  };

  return (
    <div>
      <Box sx={{ width: 600, height: 600, overflow: 'auto' }}>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {UserMassage.map((userMassage, index) => (
            <ListItem
              key={userMassage.id}
              alignItems="flex-start"
              ref={(el) => (UserMassage.length - 1 === index ? (endRef.current = el) : null)}
            >
              <ListItemAvatar>
                <Avatar alt="img" src={userMassage.SubjectChatUser?.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  userMassage.SubjectChatUser?.firstname +
                  ' ' +
                  userMassage.SubjectChatUser?.lastname
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', wordBreak: 'break-all' }}
                      component="div"
                      variant="body2"
                      color="text.primary"
                    >
                      {userMassage?.message}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          width: '100%',
          height: '44px',
          maxWidth: 600,
          bgcolor: 'background.paper',
          display: 'flex',
          position: 'sticky',
        }}
      >
        <Input
          name="message"
          style={{ width: '600px', height: '44px' }}
          placeholder="Напишите сообщение..."
          id="standard-adornment-amount"
        />
        <Button type="submit" style={{ height: '44px' }} endIcon={<SendIcon />}></Button>
      </Box>
    </div>
  );
}
