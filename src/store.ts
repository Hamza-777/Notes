import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import noteReducer from './Reducers/noteReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
