import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allTags: null,
    tagsToItem: null,
    tagsFromInput: [],
    popularTags: null,
};

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        setAllTags(state, action) {
            state.allTags = action.payload;
        },

        setTagsToItem(state, action) {
            state.tagsToItem = action.payload;
        },

        setTagsFromInput(state, action) {
            state.tagsFromInput = action.payload;
        },

        setPopularTags(state, action) {
            state.popularTags = action.payload;
        },
    },
});

export const { setAllTags, setTagsToItem, setTagsFromInput, setPopularTags } =
    tagSlice.actions;

export default tagSlice.reducer;
