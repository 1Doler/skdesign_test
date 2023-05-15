import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IUser, IRootState, IUsersState } from "../../components/Interface";

type FetchUsersArg = {
  type: string;
};
export const fetchUsers = createAsyncThunk<IUser[], FetchUsersArg>(
  "users/fetchUsers",
  async ({ type }, { rejectWithValue }) => {
    const url =
      type === "small"
        ? "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        : "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue("Error");
    }
  }
);
const initialState: IUsersState = {
  items: [],
  item: {} as IUser,
  selectItems: [],
  lengthItems: 0,
  status: null,
  filter: {
    filterText: null,
    filterOrder: null,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateLength: (state, action) => {
      state.lengthItems = action.payload;
    },
    getUser: (state, action) => {
      const user = state.items.find((item) => item.id === action.payload);
      state.item = user;
    },
    addUser: (state, action) => {
      const newItems = [action.payload, ...state.items];
      state.items = newItems;
      state.lengthItems = newItems.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.lengthItems = action.payload.length;
        state.item = {} as IUser;
        state.status = "loaded";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { updateLength, getUser, addUser } = usersSlice.actions;
