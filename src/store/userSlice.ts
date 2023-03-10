import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

import { IUser } from 'util/type';

const initialState: IUser = {
  displayName: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    },
    resetUser: (state) => {
      state.displayName = '';
      state.email = '';
    },
  },
});

export const {
  setUser,
  resetUser,
} = userSlice.actions;

export const getUser = (state: RootState): IUser => state.user;

export default userSlice.reducer;