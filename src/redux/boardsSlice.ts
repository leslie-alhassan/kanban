import { createSlice } from '@reduxjs/toolkit';
import boardData from '../data/data.json';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: boardData,
  reducers: {},
});

export default boardsSlice;
