// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  name: '',
  email: '',
  number: '',
  roles: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      const { name, email, number, roles } = action.payload;
      state.loggedIn = true;
      state.name = name;
      state.email = email;
      state.number = number;
      state.roles = roles;
    },
    logout(state) {
      state.loggedIn = false;
      state.name = '';
      state.email = '';
      state.number = '';
      state.roles = [];
    },
  },
});
// Select the user slice from the state
const selectUser = (state) => state.user;

// Create a selector to get the user data
export const selectUserData = createSelector(
  selectUser,
  (user) => user // Return the entire user slice
);

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
