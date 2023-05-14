import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slice/users";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
