import React, { useEffect, useState } from 'react';
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
  List,
  ListItem,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getTreadThunk } from '../../redux/slices/treadsSlice';
import { getFriendsThunk } from '../../redux/slices/friendsSlice';
import {
  getSubscribersThunk,
  addSubscriberThunk,
  deleteSubscriberThunk,
} from '../../redux/slices/subscribersSlice';
import FriendsList from '../ui/FriendsList';
import TreadList from '../ui/TreadList';
import { Link } from 'react-router-dom';
import AddNewCard from './AddNewCard';
import PostCard from './PostCard';
import { getPostsThunk } from '../../redux/slices/postsSlice';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function TreadPage({ darkMode, toggleDarkMode }: Props): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const posts = useAppSelector((store) => store.post);
  const tread = useAppSelector((store) => store.tread);
  const subscribers = useAppSelector((store) => store.subscribers);
  const userSelector = useAppSelector((store) => store.user);

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    dispatch(getTreadThunk(id));
  }, []);

  useEffect(() => {
    dispatch(getPostsThunk(id));
  }, [id]);

  useEffect(() => {
    dispatch(getTreadThunk(Number(id)));
  }, []);

  useEffect(() => {
    dispatch(getSubscribersThunk(id));
  }, []);

  useEffect(() => {
    const subscribed = subscribers.filter((user) => user.id === userSelector.id);
    setIsSubscribed(subscribed.length > 0);
  }, [subscribers, userSelector.id]);

  useEffect(() => {
    dispatch(getFriendsThunk(userSelector?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector?.id]);

  const subscribeHandler = () => {
    dispatch(addSubscriberThunk(id));
  };
  const unfollowHandler = () => {
    dispatch(deleteSubscriberThunk(id));
  };

  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card sx={{ maxWidth: '345' }}>
              <CardActionArea>
                <CardMedia sx={{ height: 140 }} image={`${tread.treadimg}`} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {tread.treadtitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {tread.treadbody}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {!isSubscribed && (
                  <Button size="small" color="primary" onClick={subscribeHandler}>
                    Subscribe
                  </Button>
                )}
                {isSubscribed && (
                  <Button size="small" color="secondary" onClick={unfollowHandler}>
                    Unfollow
                  </Button>
                )}
                <AvatarGroup max={4}>
                  {subscribers.map((user) => {
                    return (
                      <Link to={`/user/${user.id}`}>
                        <Avatar
                          style={{ height: '32px', width: '32px' }}
                          key={user.id}
                          alt="https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"
                          src={`${user.avatar}`}
                        />
                      </Link>
                    );
                  })}
                </AvatarGroup>
              </CardActions>
            </Card>
            <AddNewCard />
            {/* <List> */}
            {posts?.map((post) => (
              // <ListItem key={post.id} >
              <PostCard post={post} key={post.id} />
              // </ListItem>
            ))}
            {/* </List> */}
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
