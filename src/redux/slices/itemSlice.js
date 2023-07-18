import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemsInCollection: null,
    customFieldsInItem: null,
    customFieldsValues: [],
    selectedItem: null,
    lastAddedItems: null,
    commentsToItem: null,
};

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItems(state, action) {
            state.itemsInCollection = action.payload;
        },

        setCustomFieldsInItem(state, action) {
            state.customFieldsInItem = action.payload;
        },

        setCustomFieldsValues(state, action) {
            state.customFieldsValues = action.payload;
        },

        setSelectedItem(state, action) {
            state.selectedItem = action.payload;
        },

        setLastAddedItems(state, action) {
            state.lastAddedItems = action.payload;
        },

        setCommentsToItem(state, action) {
            state.commentsToItem = action.payload;
        },
    },
});

export const {
    setItems,
    setCustomFieldsInItem,
    setCustomFieldsValues,
    setSelectedItem,
    setLastAddedItems,
    setCommentsToItem,
} = itemSlice.actions;

export default itemSlice.reducer;
