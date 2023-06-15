// @ts-nocheck
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppThunk } from '../hooks';
import { SearchTreadType, SearchUserType } from '../../types/SearchTypes';
import axios from 'axios';

type SearchState = {
  searchUserResult: SearchUserType[];
  searchTreadResult: SearchTreadType[];
};
const initialState: SearchState = { searchUserResult: [], searchTreadResult: [] };

export const SearchState = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchState>) => {
      state.searchUserResult = action.payload.users;
      state.searchTreadResult = action.payload.treads;
    },
  },
});

export const { setSearch } = SearchState.actions;

export const selectSearchThunk =
  (input: { input: string }): AppThunk =>
  async (dispatch) => {
    axios
      .post<SearchState>('/api/search/results', input)
      .then(({ data }) => dispatch(setSearch(data)))
      .catch((err) => console.log(err));
  };

export default SearchState.reducer;
