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

export const setCurrentUserThunk = (id): AppThunk => (dispatch) => {
  axios<UserType>(`/api/currentUser/${id}`)
    .then(({ data }) => dispatch(setCurrentUser(data)))
    .catch(console.log);
};