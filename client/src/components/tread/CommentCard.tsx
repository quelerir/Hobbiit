import React, { useState } from 'react';
import { CommentFormType, CommentType } from '../../types/CommentTypes';
import { Avatar, Button, Card, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch } from '../../redux/hooks';
import { editCommentThunk } from '../../redux/slices/commentsSlice';

type Props = {
  comment: CommentType;
  deleteHandler: (id: number, isPost: boolean) => void;
};

function CommentCard({ comment, deleteHandler }: Props) {
  console.log(comment);
  const [isEdit, setEdit] = useState(false);

  const [input, setInput] = useState<CommentFormType>({
    commentbody: comment.commentbody,
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const editHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(editCommentThunk(input, comment.id));
    setEdit(false);
  };

  return (
    <Card sx={{ mt: 1, backgroundColor: 'lightskyblue' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Link to={`/user/${comment.User?.id}`}>
            <Avatar sx={{ mt: 1.5, ml: 2 }} alt="user photo" src={`${comment.User?.avatar}`} />
          </Link>
        </Grid>
        <Grid item xs={8}>
          {isEdit ? (
            <input
              style={{ marginTop: '0.5rem' }}
              type="text"
              name="commentbody"
              value={input.commentbody}
              onChange={handleChange}
            />
          ) : (
            <Typography color="primary" sx={{ fontWeight: 'bold', mt: 1 }}>
              {comment.commentbody}
            </Typography>
          )}
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Posted by {comment.User?.firstname} {comment.User?.lastname?.slice(0, 1)}.
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isEdit ? (
            <>
              <Button color="info" onClick={(e) => editHandler(e)}>
                <SaveIcon />
              </Button>
              <Button onClick={() => setEdit(false)} color="warning">
                <CancelIcon />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEdit(true)} color="success">
                <BorderColorIcon />
              </Button>
              <Button color="error" onClick={() => deleteHandler(comment.id, false)}>
                <DeleteForeverIcon />
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default React.memo(CommentCard);
