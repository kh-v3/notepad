import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { IPopup } from 'util/type';

const initialState: IPopup = {
  dimmed: false,
  popupAuth: false,
  popupManageBookmark: false,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopup: (state, action: PayloadAction<IPopup>) => {
      state.dimmed = action.payload.dimmed || false;
      state.popupAuth = action.payload.popupAuth || false;
      state.popupManageBookmark = action.payload.popupManageBookmark || false;
    },
  },
});

export const {
  setPopup,
} = popupSlice.actions;

export const getPopup = (state: RootState): IPopup => state.popup;

export default popupSlice.reducer;