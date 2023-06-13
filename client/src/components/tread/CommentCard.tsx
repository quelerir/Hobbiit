import React from 'react';
import { CommentFormType, CommentType } from '../../types/CommentTypes';
import { Avatar, Button, Card, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';

type Props = {
  comment: CommentType;
  deleteHandler: (id: number, isPost: boolean) => void;
};

function CommentCard({ comment, deleteHandler }: Props) {
  console.log(comment);

  return (
    <Card sx={{ mt: 1, backgroundColor: 'cornflowerblue' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Link to={`/user/${comment.User?.id}`}>
            <Avatar alt="user photo" src={`${comment.User?.avatar}`} />
          </Link>
        </Grid>
        <Grid item xs={8}>
          {' '}
          <Typography color="white" sx={{ fontWeight: 'bold', mt: 1 }}>
            {comment.commentbody}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Posted by {comment.User?.firstname} {comment.User?.lastname?.slice(0, 1)}.
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button>
            <BorderColorIcon color="success" />
          </Button>
          <Button color="error" onClick={() => deleteHandler(comment.id, false)}>
            <DeleteForeverIcon />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default React.memo(CommentCard);
