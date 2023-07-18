import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: null,
    selectedUser: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },

        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
    },
});

export const { setUsers, setSelectedUser } = adminSlice.actions;

export default adminSlice.reducer;
