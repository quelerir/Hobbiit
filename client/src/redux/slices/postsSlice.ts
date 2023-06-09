import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PostType, PostFormType } from '../../types/PostTypes';
import type { AppThunk } from '../hooks';

export type PostsState = PostType[];

const initialState: PostsState = [];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostType[]>) => action.payload,
    addPost: (state, action: PayloadAction<PostType>) => [action.payload, ...state],
    editPost: (state, action: PayloadAction<PostType>) => state.map((el) => el.id !== action.payload.id ? el : action.payload),
    deletePost: (state, action: PayloadAction<string>) =>
      state.filter((el) => el.id !== Number(action.payload)),
  },
});

export const { setPosts, addPost, deletePost, editPost } = postsSlice.actions;

export default postsSlice.reducer;

export const getPostsThunk = (treadId: string): AppThunk => (dispatch) => {
  axios<PostType[]>(`/api/posts/${treadId}`)
    .then(({ data }) => dispatch(setPosts(data)))
    .catch(console.log);
};

export const addPostThunk =
  (inputs: PostFormType, treadId: string): AppThunk =>
  (dispatch) => {
    axios
      .post<PostType>(`/api/posts/${treadId}`, inputs)
      .then(({ data }) => dispatch(addPost(data)))
      .catch(console.log);
  };

export const editPostThunk = 
(inputs: PostFormType, id: string): AppThunk =>
(dispatch) => {
    axios
    .patch<PostType>(`/api/posts/${id}`)
    .then(() => dispatch(editPost(id)))
}

export const deletePostThunk =
  (id: string): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => dispatch(deletePost(id)))
      .catch(console.log);
  };
