import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { TreadListType } from '../../types/TreadType';
import type { AppThunk } from '../hooks';

export type TreadListState = TreadListType[];

const initialState: TreadListState = [];

export const userTreadsSlice = createSlice({
  name: 'userTreads',
  initialState,
  reducers: {
    setUserTreads: (state, action: PayloadAction<TreadListType[]>) => action.payload,
  },
});

export const { setUserTreads } = userTreadsSlice.actions;

export default userTreadsSlice.reducer;

export const getUserTreadsThunk = (): AppThunk => (dispatch) => {
  axios<TreadListType[]>(`/api/user/usertreads`)
    .then(({ data }) => dispatch(setUserTreads(data)))
    .catch(console.log);
};