import React from 'react';
import { CommentFormType, CommentType } from '../../types/CommentTypes';
import { Avatar, Button, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';

type Props = {
  comment: CommentType ;
  deleteHandler: (id: number, isPost: boolean) => void;
};

export default function CommentCard({ comment, deleteHandler }: Props) {
  console.log(comment);

  return (
    <Card sx={{ mt: 1, backgroundColor: 'cornflowerblue' }}>
      <Link to={`/user/${comment.User.id}`}>
        <Avatar alt="user photo" src={`${comment.User.avatar}`} />
      </Link>
      <Typography>{comment.commentbody}</Typography>
      <Typography>Posted by {comment.User.username}</Typography>
      <Button>
        <BorderColorIcon />
      </Button>
      <Button onClick={() => deleteHandler(comment.id, false)}>
        <DeleteForeverIcon />
      </Button>
    </Card>
  );
}
