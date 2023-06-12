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
    editPost: (state, action: PayloadAction<PostType>) =>
      state.map((el) => (el.id !== action.payload.id ? el : action.payload)),
    deletePost: (state, action: PayloadAction<PostType['id']>) =>
      state.filter((el) => el.id !== Number(action.payload)),
  },
});

export const { setPosts, addPost, deletePost, editPost } = postsSlice.actions;

export default postsSlice.reducer;

export const getPostsThunk =
  (treadId: PostType['tread_id']): AppThunk =>
  (dispatch) => {
    axios<PostType[]>(`/api/posts/${treadId}`)
      .then(({ data }) => dispatch(setPosts(data)))
      .catch(console.log);
  };

export const addPostThunk =
  (input: PostFormType, treadId: PostType['tread_id']): AppThunk =>
  (dispatch) => {
    axios
      .post<PostType>(`/api/posts/${treadId}`, input)
      .then(({ data }) => dispatch(addPost(data)))
      .catch(console.log);
  };

export const editPostThunk =
  (input: PostFormType, id: PostType['id']): AppThunk =>
  (dispatch) => {
    axios.patch<PostType>(`/api/posts/${id}`, input).then(({ data }) => dispatch(editPost(data)));
  };

export const deletePostThunk =
  (id: PostType['id']): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => dispatch(deletePost(id)))
      .catch(console.log);
  };
