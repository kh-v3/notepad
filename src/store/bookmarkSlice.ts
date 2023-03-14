import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { IBookmark } from 'util/type';

const initialState: IBookmark[] = [];

export const popupSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmark: (state, action: PayloadAction<IBookmark[]>) => {
      state = [...action.payload];
    },
  },
});

export const {
  setBookmark,
} = popupSlice.actions;

export const getBookmark = (state: RootState): IBookmark[] => state.bookmark;

export default popupSlice.reducer;