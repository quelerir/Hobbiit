import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { TreadType } from '../../types/TreadType';
import type { AppThunk } from '../hooks';
import { NavigateFunction } from 'react-router-dom';

const initialState: TreadType = {};

export const treadSlice = createSlice({
   name: 'tread',
   initialState,
   reducers: {
    setTread: (state, action: PayloadAction<TreadType>) => action.payload,
   }
});

export const { setTread } = treadSlice.actions;

export default treadSlice.reducer;

export const getTreadThunk = (id: string): AppThunk => (dispatch) => {
    axios<TreadType>(`/api/tread/${id}`)
    .then(({data}) => dispatch(setTread(data)))
    .catch(console.log)


}