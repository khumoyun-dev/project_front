import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCollectionCreated: false,
    isItemCreated: false,
};

const successNotificationSlice = createSlice({
    name: 'successNotification',
    initialState,
    reducers: {
        setCollectionCreated(state, action) {
            state.isCollectionCreated = action.payload;
        },

        setItemCreated(state, action) {
            state.isItemCreated = action.payload;
        },
    },
});

export const { setCollectionCreated, setItemCreated } = successNotificationSlice.actions;

export default successNotificationSlice.reducer;
