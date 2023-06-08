import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserEditType, UserSignUpType, UserType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';
import { NavigateFunction } from 'react-router-dom';

export type UserState = UserType & { status: boolean };

const initialState: UserState = { status: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    editUser: (state, action: PayloadAction<UserEditType>) => action.payload,
    deleteUser: (state, action: PayloadAction<UserType['id']>) => {
      action.payload;
    },
  },
});

export const { setUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

export const checkUserThunk = (): AppThunk => (dispatch) => {
  axios<UserType>('/api/user/check')
    .then(({ data }) => dispatch(setUser({ ...data, status: true })))
    .catch(() => dispatch(setUser({ status: false })));
};

export const signUpThunk =
  (input: UserSignUpType, navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/signup', input)
      .then(({ data }) => {
        dispatch(setUser({ ...data, status: true }));
        navigate(`/user/${data.id}`);
      })
      .catch(() => dispatch(setUser({ status: true })));
  };

export const loginThunk =
  (input: UserSignUpType, navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/login', input)
      .then(({ data }) => {
        dispatch(setUser({ ...data, status: true }));
        navigate(`/user/${data.id}`);
      })
      .catch(() => dispatch(setUser({ status: true })));
  };

export const logoutThunk =
  (navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    axios('/api/user/logout')
      .then(() => {
        dispatch(setUser({ status: true }));
        navigate('/');
      })
      .catch(() => dispatch(setUser({ status: true })));
  };

export const editUserThunk =
  (id: UserType['id'], input: UserEditType): AppThunk =>
  (dispatch) => {
    axios
      .patch<UserType>(`/api/user/${id}/edit`, input)
      .then(({ data }) => dispatch(editUser(data)))
      .catch(() => dispatch(editUser(input)));
  };

export const deleteUserThunk =
  (id: UserType['id']): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/user/delete/${id}`)
      .then(() => dispatch(deleteUser(id)))
      .catch(() => dispatch(deleteUser(id)));
  };
