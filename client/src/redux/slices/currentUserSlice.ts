// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserEditType, UserSignUpType, UserType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';
import { NavigateFunction } from 'react-router-dom';

const initialState: UserType = {};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => action.payload,
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

export const setCurrentUserThunk =
  (id): AppThunk =>
  (dispatch) => {
    axios<UserType>(`/api/currentUser/${id}`)
      .then(({ data }) => dispatch(setCurrentUser(data)))
      .catch(console.log);
  };

export const editUserThunk =
  (id: UserType['id'], input: UserEditType): AppThunk =>
  (dispatch) => {
    axios
      .patch<UserType>(`/api/user/${id}/edit`, input)
      .then(({ data }) => dispatch(setCurrentUser(data)))
      .catch(() => dispatch(setCurrentUser(input)));
  };

export const addEditPhotoThunk =
  (avatar): AppThunk =>
  (dispatch) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    axios
      .patch(`/api/user/add-edit-photo`, formData)
      .then(({ data }) => dispatch(setCurrentUser(data)))
      .catch((err) => console.log(err));
  };
