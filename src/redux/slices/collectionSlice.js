import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collections: null,
    biggestCollections: null,
    selectedCollection: null,
    collectionsByUser: null,
    collectionsBySelectedUser: null,
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setCollections(state, action) {
            state.collections = action.payload;
        },

        setBiggestCollections(state, action) {
            state.biggestCollections = action.payload;
        },

        setSelectedCollection(state, action) {
            state.selectedCollection = action.payload;
        },

        setCollectionsByUser(state, action) {
            state.collectionsByUser = action.payload;
        },

        setCollectionsBySelectedUser(state, action) {
            state.collectionsBySelectedUser = action.payload;
        },

        resetCollectionsByUsers(state) {
            state.collectionsByUser = null;
            state.collectionsBySelectedUser = null;
        },
    },
});

export const {
    setCollections,
    setBiggestCollections,
    setSelectedCollection,
    setCollectionsByUser,
    setCollectionsBySelectedUser,
    resetCollectionsByUsers,
} = collectionSlice.actions;

export default collectionSlice.reducer;
