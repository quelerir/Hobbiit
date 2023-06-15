// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserSubscribedType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';

export type SubscribersState = UserSubscribedType[];

const initialState: SubscribersState = [];

export const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState,
  reducers: {
    setSubscribers: (state, action: PayloadAction<UserSubscribedType[]>) => action.payload,
    addSubscriber: (state, action: PayloadAction<UserSubscribedType>) => [action.payload, ...state],
    deleteSubscriber: (state, action: PayloadAction<UserSubscribedType>) => state.filter((el) => el.id !== action.payload.id),
  },
});

export const { setSubscribers, addSubscriber, deleteSubscriber } = subscribersSlice.actions;

export default subscribersSlice.reducer;

export const getSubscribersThunk = (id: string): AppThunk => (dispatch) => {
  axios<UserSubscribedType[]>(`/api/tread/${id}/subscribers`)
    .then(({ data }) => dispatch(setSubscribers(data)))
    .catch(console.log);
};

export const addSubscriberThunk = (treadId: string): AppThunk => (dispatch) => {
  axios
    .post<UserSubscribedType>(`/api/subscribe/${treadId}`)
    .then(({ data }) => dispatch(addSubscriber(data)))
    .catch(console.log);
};

export const deleteSubscriberThunk = (treadId: string): AppThunk => (dispatch) => {
  axios
    .delete<UserSubscribedType>(`/api/subscribe/${treadId}`)
    .then(({ data }) => dispatch(deleteSubscriber(data)))
    .catch(console.log);
};
