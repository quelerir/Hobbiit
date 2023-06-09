import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { editUserThunk } from '../../redux/slices/userSlice';
import { Box, Button, TextField } from '@mui/material';
import { UserEditType } from '../../types/UserTypes';
import { useParams } from 'react-router-dom';

type Props = {
  user: UserEditType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserForm({ user, setIsEdit }: Props): JSX.Element {
  const params = useParams();

  const id = params.id;

  console.log(params);

  const [input, setInput] = useState<UserEditType>({
    firstname: '',
    lastname: '',
    location: '',
    about: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(editUserThunk(Number(id), input));
    setInput({ firstname: '', lastname: '', location: '', about: '' });
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
        onChange={handleChange}
        name="firstname"
        id="outlined-textarea"
        label="firstname"
        multiline
        placeholder={user.firstname}
      />
      <TextField
        onChange={handleChange}
        name="lastname"
        id="outlined-textarea"
        label="lastname"
        multiline
        placeholder={user.lastname}
      />
      <TextField
        onChange={handleChange}
        name="location"
        id="outlined-textarea"
        label="location"
        multiline
        placeholder={user.location}
      />
      <TextField
        onChange={handleChange}
        name="about"
        id="outlined-textarea"
        label="about"
        multiline
        placeholder={user.about}
      />
      <Button sx={{ mt: 2 }} variant="contained" color="success" size="large" type="submit">
        Save changes
      </Button>
    </Box>
  );
}
