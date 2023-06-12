import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import {
  Container,
  AvatarGroup,
  Avatar,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getTreadThunk } from '../../redux/slices/treadsSlice';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import FriendsList from '../ui/FriendsList';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function TreadPage({ darkMode, toggleDarkMode }: Props): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTreadThunk(id));
  }, []);
  const tread = useAppSelector((store) => store.tread);

  const userSelector = useAppSelector((store) => store.user);

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
            <Card sx={{ maxWidth: '345' }}>
              <CardActionArea>
                <CardMedia sx={{ height: 140 }} image={`${tread?.treadimg}`} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {tread?.treadtitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {tread?.treadbody}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Subscribe
                </Button>
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <FriendsList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
