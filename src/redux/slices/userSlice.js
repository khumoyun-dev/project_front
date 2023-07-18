import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isAdmin: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAdmin = action.payload?.roles.includes('admin') || false;
        },

        setToken(state, action) {
            state.token = action.payload;
        },

        setLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },

        setLoggedOut(state) {
            state.user = null;
            state.token = null;
            state.isAdmin = false;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, setToken, setLoggedIn, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;
