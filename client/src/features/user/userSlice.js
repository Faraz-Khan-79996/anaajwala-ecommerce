import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  user: null,
  error: ''
}

/**
 * Fetches user using stored cookies and initializes the user state.
 */
const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/user/profile', { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

/**
 * Logs in the user using the credentials object containing username and password.
 * 
 * @param {object} credentials - An object containing username and password.
 */
const loginUser = createAsyncThunk('user/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('api/auth/signin', credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const googleLogin = createAsyncThunk('user/googleLogin' , async(credentials , {rejectWithValue})=>{
    try {
      const response = await axios.post('api/auth/google?auth=login', credentials, { withCredentials: true });
      return response.data;      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }      
    }
})


/**
 * Logs out the user.
 */
const signoutUser = createAsyncThunk('user/signoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/auth/signout', null, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers :{
    addUser : (state , action)=>{
      state.user = action.payload
      state.error = ''
      state.loading = false
    },
    clearUser : (state)=>{
      
      state.user = null
      state.error = ''
      state.loading = false      
    },
    clearError : (state)=>{
      state.error = ''
    }
  },
  extraReducers: builder => {

    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload || 'Failed to fetch user';
    });


    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload || 'Login failed';
    });


    builder.addCase(signoutUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(signoutUser.fulfilled, state => {
      state.loading = false;
      state.user = null;
      state.error = '';
    });
    builder.addCase(signoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Logout failed';
    });



    builder.addCase(googleLogin.pending, state => {
      state.loading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload || 'Login failed';
    });

  }
});

export default userSlice.reducer;

export {
  loginUser,
  signoutUser,
  fetchUser,
  googleLogin
}
export const {
  addUser,
  clearUser,
  clearError,
} = userSlice.actions
