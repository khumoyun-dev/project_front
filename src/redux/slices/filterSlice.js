import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usersFilterAdmins: false,
    usersFilterBlocked: false,
    collectionsThemeFilter: '',
    collectionsByUserThemeFilter: '',
    collectionsBySelectedUserThemeFilter: '',
    filterTag: '',
    itemsFilteredByTag: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setUsersFilterAdmins(state, action) {
            state.usersFilterAdmins = action.payload;
        },

        setUsersFilterBlocked(state, action) {
            state.usersFilterBlocked = action.payload;
        },

        setCollectionsThemeFilter(state, action) {
            state.collectionsThemeFilter = action.payload;
        },

        setCollectionsByUserThemeFilter(state, action) {
            state.collectionsByUserThemeFilter = action.payload;
        },

        setCollectionsBySelectedUserThemeFilter(state, action) {
            state.collectionsBySelectedUserThemeFilter = action.payload;
        },

        setDefaultUsersFilters(state) {
            state.usersFilterAdmins = false;
            state.usersFilterBlocked = false;
        },

        setDefaultCollectionsFilters(state) {
            state.collectionsThemeFilter = '';
        },

        setDefaultCollectionsByUserFilters(state) {
            state.collectionsByUserThemeFilter = '';
        },

        setDefaultCollectionsBySelectedUserFilters(state) {
            state.collectionsBySelectedUserThemeFilter = '';
        },

        setFilterTag(state, action) {
            state.filterTag = action.payload;
        },

        setItemsFilteredByTag(state, action) {
            state.itemsFilteredByTag = action.payload;
        },
    },
});

export const {
    setUsersFilterAdmins,
    setUsersFilterBlocked,
    setCollectionsThemeFilter,
    setCollectionsByUserThemeFilter,
    setCollectionsBySelectedUserThemeFilter,
    setDefaultUsersFilters,
    setDefaultCollectionsFilters,
    setDefaultCollectionsByUserFilters,
    setDefaultCollectionsBySelectedUserFilters,
    setFilterTag,
    setItemsFilteredByTag,
} = filterSlice.actions;

export default filterSlice.reducer;
