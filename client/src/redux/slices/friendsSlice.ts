import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserType } from '../../types/UserTypes';
import type { AppThunk } from '../hooks';

type FriendsState = {
  friendsList: UserType[];
  friendsOnline: UserType[];
};
const initialState: FriendsState = { friendsList: [], friendsOnline: [] };

export const userSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<UserType[]>) => {
      state.friendsList = action.payload;
    },
    setFriendsOnline: (state, action: PayloadAction<UserType[]>) => {
      const friends = JSON.parse(JSON.stringify(state.friendsList)) as FriendsState['friendsList'];
      // eslint-disable-next-line no-restricted-syntax
      for (const friend of action.payload) {
        const index = friends.findIndex((el) => el.id === friend.id);
        if (index !== -1) friends[index].status = friend.status;
      }
      state.friendsOnline = action.payload;
      state.friendsList = friends;
    },
  },
});

export const { setFriends, setFriendsOnline } = userSlice.actions;

export const getFriendsThunk =
  (userId: UserType['id']): AppThunk =>
  (dispatch) => {
    if (userId) {
      return axios<UserType[]>(`/api/friends/${userId}`)
        .then(({ data }) => dispatch(setFriends(data)))
        .catch(console.log);
    }
  };

export default userSlice.reducer;
