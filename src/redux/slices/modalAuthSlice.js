import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    isShown: false,
};

const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        showModal(state, action) {
            state.isShown = true;
            state.id = action.payload;
        },
        closeModal(state) {
            state.isShown = false;
        },
    },
});

export const { showModal, closeModal } = authModalSlice.actions;

export default authModalSlice.reducer;
