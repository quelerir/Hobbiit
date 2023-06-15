// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CommentType, CommentFormType } from '../../types/CommentTypes';
import type { AppThunk } from '../hooks';

export type CommentState = CommentType[];
export type CommentStateArray = CommentState;

const initialState: CommentState = [];

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentType[]>) => action.payload,
    addComment: (state, action: PayloadAction<CommentType>) => [action.payload, ...state],
    editComment: (state, action: PayloadAction<CommentType>) =>
      state.map((el) => (el.id !== action.payload.id ? el : action.payload)),
    deleteComment: (state, action: PayloadAction<CommentType['id']>) =>
      state.filter((el) => el.id !== Number(action.payload)),
  },
});

export const { setComments, addComment, deleteComment, editComment } = commentsSlice.actions;

export default commentsSlice.reducer;

export const getCommentsThunk =
  (): AppThunk =>
  (dispatch) => {
    axios<CommentType[]>(`/api/comments/`)
      .then(({ data }) => dispatch(setComments(data)))
      .catch(console.log);
  };

export const addCommentThunk =
  (input: CommentFormType, postId: CommentType['post_id']): AppThunk =>
  (dispatch) => {
    axios
      .post<CommentType>(`/api/comments/${postId}`, input)
      .then(({ data }) => dispatch(addComment(data)))
      .catch(console.log);
  };

export const editCommentThunk =
  (input: CommentFormType, id: CommentType['id']): AppThunk =>
  (dispatch) => {
    axios
      .patch<CommentType>(`/api/comments/${id}`, input)
      .then(({ data }) => dispatch(editComment(data)));
  };

export const deleteCommentThunk =
  (id: CommentType['id']): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/comments/${id}`)
      .then(() => dispatch(deleteComment(id)))
      .catch(console.log);
  };
