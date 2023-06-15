import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MassageType } from '../../types/massageType';
import type { AppThunk } from '../hooks';
import axios from 'axios';

export type MassageState = MassageType[];

const initialState: MassageState = [];

export const messageSlice = createSlice({
  name: 'UserMessage',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MassageType[]>) => action.payload,
    addMessage: (state, action: PayloadAction<MassageType>) => [action.payload, ...state],
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;

export const setMessageThunk =
  (id: MassageType['id']): AppThunk =>
  (dispatch) => {
    axios
      .get(`/api/chat/${id}`)
      .then(({ data }) => dispatch(setMessage(data)))
      .catch((err) => console.log(err));
  };

export const addMessageThunk =
  (id: MassageType['id'], message: MassageType): AppThunk =>
  (dispatch) => {
    console.log('thunk', id, message);
    axios
      .post(`/api/chat/addmessage/${id}`, message)
      .then(({ data }) => dispatch(addMessage(data)))
      .catch((err) => console.log(err));
  };
