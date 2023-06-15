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
import TreadList from '../ui/TreadList';
import emojis from '../utils/emojis';
import { useParams } from 'react-router-dom';
import { UPDATE_STATUS } from '../../types/wsTypes';
import { addEditPhotoThunk, setCurrentUserThunk } from '../../redux/slices/currentUserSlice';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { addFriendThunk, deleteFriendThunk } from '../../redux/slices/friendsSlice';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function UserPage({ darkMode, toggleDarkMode }: Props): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [openAddPhoto, setOprAddPhoto] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState(true);

  const handleClick = (status: string): void => {
    dispatch({ type: UPDATE_STATUS, payload: { status } });
  };

  const userSelector = useAppSelector((store) => store.user);
  const currentUser = useAppSelector((store) => store.currentUser);

  const { friendsList = [] } = useAppSelector((store) => store.friends);

  const addFriendHandler = () => {
    dispatch(addFriendThunk(currentUser.id));
  };
  const deleteFriendHandler = () => {
    setListUpdated(true);
    dispatch(deleteFriendThunk(currentUser.id));
  };

  const [isFriend, setisFriend] = useState(false);

  useEffect(() => {
    dispatch(setCurrentUserThunk(id));
  }, [id]);

  const [listUpdated, setListUpdated] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const photoEditHandler = () => {
    dispatch(addEditPhotoThunk(selectedFile));
    setOprAddPhoto(true);
  };
  useEffect(() => {
    if (listUpdated) {
      dispatch(getFriendsThunk(userSelector?.id));
    }
    setListUpdated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdated]);

  useEffect(() => {
    const friended = friendsList.filter((user) => user.id === currentUser.id);
    setisFriend(friended.length > 0);
  }, [friendsList, currentUser.id]);

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
                    src={`${currentUser?.avatar}`}
                    sx={{ width: 70, height: 70 }}
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
                      {Object.entries(emojis)?.map((el) => (
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
                    {`${currentUser?.firstname} ${currentUser?.lastname}`}
                  </Typography>

                  {currentUser?.id !== userSelector?.id &&
                    ((!isFriend && (
                      <Button size="small" color="primary" onClick={addFriendHandler}>
                        Add to Friends
                      </Button>
                    )) ||
                      (isFriend && (
                        <Button size="small" color="secondary" onClick={deleteFriendHandler}>
                          Delete from Friends
                        </Button>
                      )))}

                  <Typography variant="h5" component="div"></Typography>
                  <Typography style={{ fontSize: '16px' }} sx={{ mb: 1.5 }} color="text.secondary">
                    Location: {currentUser?.location}
                  </Typography>
                  <Typography style={{ fontSize: '13px' }} variant="body2">
                    About: {currentUser?.about}
                  </Typography>
                  {userSelector?.id === currentUser?.id && (
                    <CardActions>
                      {openAddPhoto ? (
                        <AddAPhotoIcon
                          style={{
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: '1',
                            top: '-137px',
                            left: '60px',
                          }}
                          onClick={() => setOprAddPhoto(false)}
                        />
                      ) : (
                        <>
                          <SaveAltIcon
                            style={{
                              cursor: 'pointer',
                              position: 'relative',
                              zIndex: '0',
                              top: '-137px',
                              left: '60px',
                            }}
                            onClick={photoEditHandler}
                          />
                          <input accept="image/*" type="file" onChange={handleFileChange} />
                        </>
                      )}
                      <Button style={{ color: '#3E7065' }} onClick={() => setIsEdit(false)}>
                        Edit profile
                      </Button>
                      <DeleteUserModal />
                    </CardActions>
                  )}
                </CardContent>
              </Card>
            ) : (
              currentUser?.id === userSelector?.id && (
                <EditUserForm setIsEdit={setIsEdit} user={userSelector} />
              )
            )}
          </Grid>
          <Grid item xs={4}>
            <FriendsList />
            <TreadList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
