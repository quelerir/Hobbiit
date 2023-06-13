import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserEditType, UserSignUpType, UserType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';
import { NavigateFunction } from 'react-router-dom';

export type UserState = UserType & { locationStatus: boolean };

const initialState: UserState = { locationStatus: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    deleteUser: (state, action: PayloadAction<UserType['id']>) => {
      action.payload;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

export const checkUserThunk = (): AppThunk => (dispatch) => {
  axios<UserType>('/api/user/check')
    .then(({ data }) => dispatch(setUser({ ...data, locationStatus: true })))
    .catch(() => dispatch(setUser({ locationStatus: false })));
};

export const signUpThunk =
  (input: UserSignUpType, navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/signup', input)
      .then(({ data }) => {
        dispatch(setUser({ ...data, locationStatus: true }));
        navigate(`/user/${data.id}`);
      })
      .catch(() => dispatch(setUser({ locationStatus: true })));
  };

export const loginThunk =
  (input: UserSignUpType, navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/login', input)
      .then(({ data }) => {
        dispatch(setUser({ ...data, locationStatus: true }));
        navigate(`/user/${data.id}`);
      })
      .catch(() => dispatch(setUser({ locationStatus: true })));
  };

export const logoutThunk =
  (navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    axios('/api/user/logout')
      .then(() => {
        dispatch(setUser({ locationStatus: true }));
        navigate('/');
      })
      .catch(() => dispatch(setUser({ locationStatus: true })));
  };

export const deleteUserThunk =
  (id: UserType['id'], navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    axios
      .delete(`/api/user/delete/${id}`)
      .then(() => {
        dispatch(deleteUser(id));
        navigate('/');
      })
      .catch(() => dispatch(deleteUser(id)));
  };

