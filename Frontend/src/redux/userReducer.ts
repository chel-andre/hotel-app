import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserSvc from "../services/userService";


export interface loggedInUser {
  loggedIn: boolean;
    firstName: string;
    lastName: string;
    userType: string;
    email?: string;
}


export interface userState {
  loggedInUser: loggedInUser;
  status: string;
}

const initialState: userState = {
  loggedInUser: {
    loggedIn: false,
    firstName: "",
    lastName: "",
    userType: "",
  },
  status: "loading",
};

export const getUser = createAsyncThunk("UserSlice/getUser", async () => {
  const response = await UserSvc.getUser();
  return response?.data.data;
});

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedInUser.firstName = action.payload.firstName;
      state.loggedInUser.lastName = action.payload.lastName;
      state.loggedInUser.userType = action.payload.userType;
      state.loggedInUser.loggedIn = true;
    },
    logout: (state) => {
      state.loggedInUser.firstName = "";
      state.loggedInUser.lastName = "";
      state.loggedInUser.userType = "";
      state.loggedInUser.loggedIn = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loggedInUser = {
        ...action.payload,
      };
      state.loggedInUser.loggedIn = true;
      state.status = "completed";
    });

    builder.addCase(getUser.rejected, (state) => {
      state.loggedInUser.loggedIn = false;
      state.status = "failed";
    });
  },
});

export const { setUser, logout } = UserSlice.actions;
export default UserSlice.reducer;
