import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import { deleteUserThunk } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function DeleteUserModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () => {
    dispatch(deleteUserThunk(Number(id), navigate));
  };

  return (
    <div>
      <Button color="error" onClick={handleOpen}>
        Delete profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Danger! Delete User</h2>
          <p id="parent-modal-description">Are you sure you want to delete your account?</p>
          <Button onClick={deleteHandler}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}
