import React, { useCallback, useEffect, useState } from 'react';
import { PostType } from '../../types/PostTypes';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CommentCard from './CommentCard';
import {
  addCommentThunk,
  deleteCommentThunk,
  getCommentsThunk,
} from '../../redux/slices/commentsSlice';
import SendIcon from '@mui/icons-material/Send';
import EditPostModal from './EditPostModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deletePostThunk } from '../../redux/slices/postsSlice';
import { SEND_LIKE } from '../../types/wsTypes';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
  post: PostType;
};

export default function PostCard({ post }: Props) {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({ commentbody: '' });
  const user = useAppSelector((store) => store.user);

  const allComments = useAppSelector((state) => state.comment);
  const comments = allComments.filter((comment) => comment.post_id === post.id)
  const [commentsList, setCommentsList] = useState(comments.slice(0, 3));
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    dispatch(getCommentsThunk());
  }, []);

  useEffect(() => {
    setCommentsList(!toggle ? comments : comments.slice(0, 3));
  }, [comments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addCommentThunk(input, post.id));
    setInput({ commentbody: '' });
  };

  const deleteHandler = useCallback((id: number, isPost: boolean) => {
    if (isPost) {
      console.log('Post deleted');

      dispatch(deletePostThunk(id));
    } else {
      dispatch(deleteCommentThunk(id));
    }
  }, []);

  const likeHandler = () => {
    dispatch({ type: SEND_LIKE, payload: { postId: post.id } });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card sx={{ mt: 2 }}>
        {post.postimg && (
          <CardMedia component="img" alt="post img" height="140" image={post.postimg} />
        )}
        <CardContent>
          <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              {post.posttitle}
            </Typography>
            {(user.id === post.user_id) &&(<EditPostModal post={post} />)}
            {(user.id === post.user_id) && (<Button>
              <DeleteForeverIcon onClick={() => deleteHandler(post.id, true)} />
            </Button>)}
          </Container>
          <Typography variant="body2" color="text.primary">
            {post.postbody}
          </Typography>
          <Typography variant="body1" color="text.primary"></Typography>
            <div style={{ position: 'sticky', marginLeft: '410px', marginTop: '20px' }}>
              <FavoriteBorderIcon onClick={likeHandler} />
              {post.likecount}
            </div>
        </CardContent>

        <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="subtitle2" color="text.primary" align="left">
            Comments
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            sx={{
              '& .MuiTextField-root': { mt: 2, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={10}>
              <Grid item xs={8}>
                <TextField
                  value={input.commentbody}
                  onChange={handleChange}
                  name="commentbody"
                  id="outlined-textarea"
                  label="Enter new comment"
                  sx={{ minWidth: '400px', maxWidth: '600px', height: '30px' }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  sx={{ mt: 2, fontSize: '0.77rem', height: '55px' }}
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {commentsList?.map((comment) => (
              <Grid item xs={10} key={comment.id}>
                <CommentCard comment={comment} deleteHandler={deleteHandler} />
              </Grid>
            ))}
            <Grid item xs={10}>
            <Button
              variant="contained"
              sx={{ ml: 2, mt: 2, borderRadius: 0 }}
              onClick={() => {
                setCommentsList(toggle ? comments : comments.slice(0, 3));
                setToggle((prev) => !prev);
              }}
            >
              {!toggle ? 'Less...' : 'More...'}
            </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
}
