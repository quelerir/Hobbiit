import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { Box, Button, TextField } from '@mui/material';
import { UserEditType } from '../../types/UserTypes';
import { useParams } from 'react-router-dom';
import { editUserThunk } from '../../redux/slices/currentUserSlice';

type Props = {
  user: UserEditType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserForm({ user, setIsEdit }: Props): JSX.Element {
  const params = useParams();

  const id = params.id;
  
  const [input, setInput] = useState<UserEditType>({
    firstname: user.firstname,
    lastname: user.lastname,
    location: user.location,
    about: user.about,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(editUserThunk(Number(id), input));
    setIsEdit(true);
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
        value={input.firstname}
        onChange={handleChange}
        name="firstname"
        id="outlined-textarea"
        label="firstname"
        multiline
      />
      <TextField
        value={input.lastname}
        onChange={handleChange}
        name="lastname"
        id="outlined-textarea"
        label="lastname"
        multiline
      />
      <TextField
        value={input.location}
        onChange={handleChange}
        name="location"
        id="outlined-textarea"
        label="location"
        multiline
      />
      <TextField
        value={input.about}
        onChange={handleChange}
        name="about"
        id="outlined-textarea"
        label="about"
        multiline
      />
      <Button sx={{ mt: 2 }} variant="contained" color="success" size="large" type="submit">
        Save changes
      </Button>
    </Box>
  );
}
