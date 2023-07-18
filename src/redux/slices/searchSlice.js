import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: '',
    offcanvasShown: false,
    allComments: null,
    allItems: null,
    foundInItems: [],
    foundInCollections: [],
    foundInComments: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },

        setOffcanvasShown(state, action) {
            state.offcanvasShown = action.payload;
        },

        setAllComments(state, action) {
            state.allComments = action.payload;
        },

        setAllItems(state, action) {
            state.allItems = action.payload;
        },

        setFoundInItems(state, action) {
            state.foundInItems = action.payload;
        },

        setFoundInCollections(state, action) {
            state.foundInCollections = action.payload;
        },

        setFoundInComments(state, action) {
            state.foundInComments = action.payload;
        },

        resetSearchResults(state) {
            state.searchValue = '';
            state.foundInItems = [];
            state.foundInCollections = [];
            state.foundInComments = [];
        },
    },
});

export const {
    setSearchValue,
    setOffcanvasShown,
    setAllComments,
    setAllItems,
    setFoundInItems,
    setFoundInCollections,
    setFoundInComments,
    resetSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
