import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import userReducer from 'store/userSlice';
import popupReducer from 'store/popupSlice';
import bookmarkReducer from 'store/bookmarkSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    popup: popupReducer,
    bookmark: bookmarkReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;