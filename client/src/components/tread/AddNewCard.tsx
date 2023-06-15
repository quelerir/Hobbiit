import React, { useState } from 'react';
import { PostFormType } from '../../types/PostTypes';
import { useAppDispatch } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { addPostThunk } from '../../redux/slices/postsSlice';

export default function AddNewCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addPostThunk(selectedFile, input, Number(id)));
    setInput({ posttitle: '', postbody: '', postimg: '' });
    setSelectedFile(null);
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
        style={{ width: '500px' }}
        value={input.posttitle}
        onChange={handleChange}
        name="posttitle"
        id="outlined-textarea"
        label="Title"
        multiline
      />
      <TextField
        style={{ width: '500px' }}
        value={input.postbody}
        onChange={handleChange}
        name="postbody"
        id="outlined-textarea"
        label="Body"
        multiline
      />
      <TextField
        style={{ width: '500px' }}
        name="postimg"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      <br />
      <Button sx={{ mt: 2 }} variant="contained" color="success" size="large" type="submit">
        Add new post
      </Button>
    </Box>
  );
}
