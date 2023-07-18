import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usersSorting: 'fromNewToOld',
    collectionsSorting: 'fromNewToOld',
    collectionsByUserSorting: 'fromNewToOld',
    collectionsBySelectedUserSorting: 'fromNewToOld',
    itemsSorting: 'fromNewToOld',
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setUsersSortingType(state, action) {
            state.usersSorting = action.payload;
        },

        setCollectionsSortingType(state, action) {
            state.collectionsSorting = action.payload;
        },

        setCollectionsByUserSortingType(state, action) {
            state.collectionsByUserSorting = action.payload;
        },

        setCollectionsBySelectedUserSortingType(state, action) {
            state.collectionsBySelectedUserSorting = action.payload;
        },

        setItemsSortingType(state, action) {
            state.itemsSorting = action.payload;
        },

        setDefaultUsersSorting(state) {
            state.usersSorting = 'fromNewToOld';
        },

        setDefaultCollectionsSorting(state) {
            state.collectionsSorting = 'fromNewToOld';
        },

        setDefaultCollectionsByUserSorting(state) {
            state.collectionsByUserSorting = 'fromNewToOld';
        },

        setDefaultCollectionsBySelectedUserSorting(state) {
            state.collectionsBySelectedUserSorting = 'fromNewToOld';
        },

        setDefaultItemsSorting(state) {
            state.itemsSorting = 'fromNewToOld';
        },

        setEmptyItemsSorting(state) {
            state.itemsSorting = '';
        },
    },
});

export const {
    setUsersSortingType,
    setCollectionsSortingType,
    setCollectionsByUserSortingType,
    setCollectionsBySelectedUserSortingType,
    setItemsSortingType,
    setDefaultUsersSorting,
    setDefaultCollectionsSorting,
    setDefaultCollectionsByUserSorting,
    setDefaultCollectionsBySelectedUserSorting,
    setDefaultItemsSorting,
    setEmptyItemsSorting,
} = sortSlice.actions;

export default sortSlice.reducer;
