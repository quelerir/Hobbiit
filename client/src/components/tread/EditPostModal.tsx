import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { editPostThunk } from '../../redux/slices/postsSlice';
import { PostFormType, PostType } from '../../types/PostTypes';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Modal, Button, TextField } from '@mui/material';

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

type Props = {
  post: PostType;
};

export default function EditPostModal({ post }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<PostFormType>({
    posttitle: post.posttitle,
    postbody: post.postbody,
    postimg: post.postimg,
  });

  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const editHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(editPostThunk(input, post.id));
    handleClose();
  };

  return (
    <div>
      <Button color="success" onClick={handleOpen}>
        <BorderColorIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }} component="form" onSubmit={(e) => editHandler(e)}>
          <h2 id="parent-modal-title">Edit post</h2>
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
          <Button type="submit">Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
