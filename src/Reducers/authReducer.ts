import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { getAuth, getUser } from '../Misc/localStorage';
import { sendSignupReq, logoutUser, sendLoginReq } from '../Misc/requests';

interface AuthState {
  userLoggedIn: boolean;
  token: undefined | null | string;
  currentUser: null | undefined | {};
  loading: boolean;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserSignup {
  avatar: string;
  email: string;
  password: string;
  name: string;
}

const initialState: AuthState = {
  userLoggedIn: getAuth() ? true : false,
  token: getAuth(),
  currentUser: getUser(),
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (user: UserLogin, thunkAPI) => {
    try {
      return await sendLoginReq(user);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (user: UserSignup, thunkAPI) => {
    try {
      return await sendSignupReq(user);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.userLoggedIn = true;
        state.token = action.payload[0];
        state.currentUser = action.payload[1];
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
        state.userLoggedIn = false;
        state.token = null;
        state.currentUser = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.userLoggedIn = true;
        state.token = action.payload[0];
        state.currentUser = action.payload[1];
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.userLoggedIn = false;
        state.token = null;
        state.currentUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userLoggedIn = false;
        state.token = null;
        state.currentUser = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
