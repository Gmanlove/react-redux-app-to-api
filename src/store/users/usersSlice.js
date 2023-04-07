import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../../api/randomUserAPI';

export const fetchRandomUsers = createAsyncThunk(
  'users/fetchRandomUsers',
  async () => {
    const response = await fetchUsers();
    return response.data.results;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRandomUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchRandomUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
export const { } = usersSlice.actions;
