import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CommentType, CommentFormType } from '../../types/CommentTypes';
import type { AppThunk } from '../hooks';

export type CommentState = CommentType[];

const initialState: CommentState = [];

export const commentsSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
      setComments: (state, action: PayloadAction<CommentType[]>) => action.payload,
      addComment: (state, action: PayloadAction<CommentType>) => [action.payload, ...state],
      editComment: (state, action: PayloadAction<CommentType>) => state.map((el) => el.id !== action.payload.id ? el : action.payload),
      deleteComment: (state, action: PayloadAction<string>) =>
        state.filter((el) => el.id !== Number(action.payload)),
    },
  });

  export const { setComments, addComment, deleteComment, editComment } = commentsSlice.actions;

  export default commentsSlice.reducer;

  export const getCommentsThunk = (postId: string): AppThunk => (dispatch) => {
    axios<CommentType[]>(`/api/comments/${postId}`)
      .then(({ data }) => dispatch(setComments(data)))
      .catch(console.log);
  };

  export const addCommentThunk =
  (inputs: CommentFormType, postId: string): AppThunk =>
  (dispatch) => {
    axios
      .post<CommentType>(`/api/comments/${postId}`, inputs)
      .then(({ data }) => dispatch(addComment(data)))
      .catch(console.log);
  };

  export const editCommentThunk = 
  (inputs: CommentFormType, id: string): AppThunk =>
  (dispatch) => {
    axios
    .patch<CommentType>(`/api/comments/${id}`)
    .then(() => dispatch(editComment(id)))
}

export const deleteCommentThunk =
  (id: string): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/comments/${id}`)
      .then(() => dispatch(deleteComment(id)))
      .catch(console.log);
  };
