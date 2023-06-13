import React, { useState } from 'react';
import { PostFormType } from '../../types/PostTypes';
import { useAppDispatch } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { addPostThunk } from '../../redux/slices/postsSlice';

export default function AddNewCard() {
  const params = useParams();

  const id = params.id;

  const [input, setInput] = useState<PostFormType>({
    posttitle: '',
    postbody: '',
    postimg: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addPostThunk(input, Number(id)));
    setInput({ posttitle: '', postbody: '', postimg: '' });
  };
  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        '& .MuiTextField-root': { mt: 2, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={input.posttitle}
        onChange={handleChange}
        name="posttitle"
        id="outlined-textarea"
        label="Title"
        multiline
      />
      <TextField
        value={input.postbody}
        onChange={handleChange}
        name="postbody"
        id="outlined-textarea"
        label="Body"
        multiline
      />
      <TextField
        value={input.postimg}
        onChange={handleChange}
        name="postimg"
        id="outlined-textarea"
        label="Image"
        multiline
      />
      <br />
      <Button sx={{ mt: 2 }} variant="contained" color="success" size="large" type="submit">
        Add new post
      </Button>
    </Box>
  );
}
