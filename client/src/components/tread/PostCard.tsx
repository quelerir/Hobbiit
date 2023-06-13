import React, { useEffect, useState } from 'react';
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
  List,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CommentCard from './CommentCard';
import { addCommentThunk, getCommentsThunk } from '../../redux/slices/commentsSlice';
import SendIcon from '@mui/icons-material/Send';
import EditPostModal from './EditPostModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deletePostThunk } from '../../redux/slices/postsSlice';

type Props = {
  post: PostType;
};

export default function PostCard({ post }: Props) {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({ commentbody: '' });

  const comments = useAppSelector((state) => state.comment);
  const [commentsList, setCommentsList] = useState(comments.slice(0, 3));
  const [toggle, setToggle] = useState(true);
  console.log(comments);

  useEffect(() => {
    dispatch(getCommentsThunk(post.id));
  }, []);

  useEffect(() => {
    if (!commentsList.length) setCommentsList(comments.slice(0, 3));
  }, [comments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addCommentThunk(input, post.id));
    setInput({ commentbody: '' });
  };

  const deleteHandler = () => {
    dispatch(deletePostThunk(post.id));
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardMedia component="img" alt="post img" height="140" image={post.postimg} />
      <CardContent>
        <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            {post.posttitle}
          </Typography>
          <EditPostModal post={post} />
          <Button>
            <DeleteForeverIcon onClick={deleteHandler} />
          </Button>
        </Container>
        <Typography variant="body2" color="text.primary">
          {post.postbody}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" color="text.primary">
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
                multiline
                sx={{ minWidth: '400px', maxWidth: '600px', height: '50px' }}
              />
            </Grid>
            <Grid item xs={4}>
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
        <Grid container spacing={2}>
          {commentsList?.map((comment) => (
            <Grid item xs={12} key={comment.id}>
              <CommentCard comment={comment} postId={post.id} />
            </Grid>
          ))}
          <Button
            variant="contained"
            sx={{ ml: 2, mt: 2 }}
            onClick={() => {
              setCommentsList(toggle ? comments : comments.slice(0, 3));
              setToggle((prev) => !prev);
            }}
          >
            {!toggle ? 'Less...' : 'More...'}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
