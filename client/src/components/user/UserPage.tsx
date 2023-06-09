import React, { useEffect, useState } from 'react';
import Navbar from '../ui/Navbar';
import {
  Box,
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Grid,
  Popover,
} from '@mui/material';
import EditUserForm from './EditUserForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import DeleteUserModal from './DeleteUserModal';
import FriendsList from '../ui/FriendsList';
import emojis from '../utils/emojis';
import { UPDATE_STATUS } from '../../types/wsTypes';


type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function UserPage({ darkMode, toggleDarkMode }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState(true);

  const handleClick = (status: string): void => {
    dispatch({ type: UPDATE_STATUS, payload: { status } });
  };

  const userSelector = useAppSelector((store) => store.user);
  const { friendsList = [], friendsOnline = [] } = useAppSelector((store) => store.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriendsThunk(userSelector?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector?.id]);

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {isEdit ? (
              <Card sx={{ minWidth: 275, maxWidth: 775 }}>
                <Stack sx={{ mt: 2, ml: 2 }}>
                  <Avatar
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}
                    alt="Remy Sharp"
                    src={`${userSelector?.avatar}`}
                    sx={{ width: 56, height: 56 }}
                  />
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
                    {`${userSelector.firstname} ${userSelector.lastname}`}
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {userSelector.location}
                  </Typography>
                  <Typography variant="body2">{userSelector.about}</Typography>
                  <CardActions>
                    <Button onClick={() => setIsEdit(false)}>Edit profile</Button>
                    <DeleteUserModal />
                  </CardActions>
                </CardContent>
              </Card>
            ) : (
              <EditUserForm setIsEdit={setIsEdit} user={userSelector} />
            )}
          </Grid>
          <Grid item xs={4}>
            <FriendsList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
