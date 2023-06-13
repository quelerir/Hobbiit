import React from 'react';
import { CommentFormType } from '../../types/CommentTypes';
import { Card, Typography } from '@mui/material';

type Props = {
  comment: CommentFormType;
  postId: number;
};

export default function CommentCard({ comment, postId }: Props) {
  console.log(comment);

  return (
    <Card sx={{ mt: 1, backgroundColor: 'cornflowerblue' }}>
      <Typography>{comment.commentbody}</Typography>
    </Card>
  );
}
