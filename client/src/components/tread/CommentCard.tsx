import React, { useState } from 'react';
import { CommentFormType, CommentType } from '../../types/CommentTypes';
import { Avatar, Button, Card, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { editCommentThunk } from '../../redux/slices/commentsSlice';

type Props = {
  comment: CommentType;
  deleteHandler: (id: number, isPost: boolean) => void;
};

function CommentCard({ comment, deleteHandler }: Props) {
  const [isEdit, setEdit] = useState(false);

  const [input, setInput] = useState<CommentFormType>({
    commentbody: comment.commentbody,
  });
  const user = useAppSelector((store) => store.user);

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
    <Card sx={{ mt: 1, backgroundColor: '#3E7065', height: '120px' }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Link to={`/user/${comment.User?.id}`}>
            <Avatar
              sx={{ mt: 1, ml: 1, boxShadow: 'white 0px 0px 57px' }}
              alt="user photo"
              src={`${comment.User?.avatar}`}
            />
          </Link>
        </Grid>
        <Grid item>
          {isEdit ? (
            <input
              style={{ marginTop: '0.5rem' }}
              type="text"
              name="commentbody"
              value={input.commentbody}
              onChange={handleChange}
            />
          ) : (
            <Typography
              color="white"
              sx={{
                marginTop: '50px',
                marginLeft: '-30px',
                fontSize: '11px',
                width: '400px',
                wordWrap: 'break-word',
              }}
            >
              {comment.commentbody}
            </Typography>
          )}
          <Typography color="text.secondary" sx={{ position: marginTop: '20px', fontSize: '13px' }}>
            {comment.User?.firstname} {comment.User?.lastname?.slice(0, 1)}.
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {user.id === comment.user_id &&
            (isEdit ? (
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
            ))}
        </Grid>
      </Grid>
    </Card>
  );
}

export default React.memo(CommentCard);
