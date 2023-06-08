import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserSignUpType, UserType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';

export type UserState = UserType & { locationStatus: boolean };

const initialState: UserState = { locationStatus: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const checkUserThunk = (): AppThunk => (dispatch) => {
  axios<UserType>('/api/user/check')
    .then(({ data }) => dispatch(setUser({ ...data, locationStatus: true })))
    .catch(() => dispatch(setUser({ locationStatus: false })));
};

export const signUpThunk =
  (input: UserSignUpType): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/signup', input)
      .then(({ data }) => dispatch(setUser({ ...data, locationStatus: true })))
      .catch(() => dispatch(setUser({ locationStatus: true })));
  };

export const loginThunk =
  (input: UserSignUpType): AppThunk =>
  (dispatch) => {
    axios
      .post<UserType>('/api/user/login', input)
      .then(({ data }) => dispatch(setUser({ ...data, locationStatus: true })))
      .catch(() => dispatch(setUser({ locationStatus: true })));
  };

export const logoutThunk = (): AppThunk => (dispatch) => {
  axios('/api/user/logout')
    .then(() => dispatch(setUser({ locationStatus: true })))
    .catch(() => dispatch(setUser({ locationStatus: true })));
};
