import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { TreadType, TreadFormType } from '../../types/TreadType';
import type { AppThunk } from '../hooks';

const initialState: TreadType = {};

export const treadSlice = createSlice({
  name: 'tread',
  initialState,
  reducers: {
    setTread: (state, action: PayloadAction<TreadType>) => action.payload,
    addTread: (state, action: PayloadAction<TreadType>) => action.payload,
    editTread: (state, action: PayloadAction<TreadType>) => action.payload,
    deleteTread: (state, action: PayloadAction<TreadType>) => {},
  },
});

export const { setTread, addTread, editTread, deleteTread } = treadSlice.actions;

export default treadSlice.reducer;

export const getTreadThunk =
  (id: TreadType['id']): AppThunk =>
  (dispatch) => {
    axios<TreadType>(`/api/tread/${id}`)
      .then(({ data }) => dispatch(setTread(data)))
      .catch(console.log);
  };

// export const addTreadThunk =
//   (inputs: TreadFormType): AppThunk =>
//   (dispatch) => {
//     axios
//       .post<TreadType>(`/api/tread/add`, inputs)
//       .then(({ data }) => dispatch(addTread(data)))
//       .catch(console.log);
//   };

// export const editTreadThunk =
//   (inputs: TreadFormType, id: TreadType['id']): AppThunk =>
//   (dispatch) => {
//     axios.patch<TreadType>(`/api/tread/${id}`, inputs).then(() => dispatch(editTread(id)));
//   };

// export const deleteTreadThunk =
//   (id: string): AppThunk =>
//   (dispatch) => {
//     axios
//       .delete(`/api/tread/${id}}`)
//       .then(() => dispatch(deleteTread(id)))
//       .catch(console.log);
//   };
